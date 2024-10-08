import cv2
import torch
import numpy as np

model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

capture = cv2.VideoCapture(0)

previous_center = None
movement_threshold = 15

stale_frames_threshold = 20
stale_frame_count = 0

is_stationary = False
previous_direction = None

while True:
    ret, frame = capture.read()
    if not ret:
        break

    results = model(frame)

    detections = results.xyxy[0]

    current_center = None
    detection_buffer = []

    for *box, conf, cls in detections:
        x1, y1, x2, y2 = map(int, box)

        width = x2 - x1
        height = y2 - y1

        aspect_ratio = width / height if height > 0 else 0

        if 0.9 <= aspect_ratio <= 1.1:
            current_center = ((x1 + x2) // 2, (y1 + y2) // 2)

            roi = frame[y1:y2, x1:x2]
            gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
            _, thresh_roi = cv2.threshold(gray_roi, 50, 255, cv2.THRESH_BINARY)

            contours, _ = cv2.findContours(thresh_roi.copy(), cv2.RETR_EXTERNAL,
                                           cv2.CHAIN_APPROX_SIMPLE)

            for contour in contours:
                perimeter = cv2.arcLength(contour, True)

                if perimeter > 0:
                    circularity = (4 * np.pi * cv2.contourArea(contour)) / (perimeter ** 2)

                    if circularity > 0.6:
                        label = f'Circle {conf:.2f}'
                        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                        cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX,
                                    0.5, (255, 255, 255), 2)
                        cv2.circle(frame, current_center, radius=5,
                                   color=(255, 0, 0), thickness=-1)

    if current_center is not None:
        detection_buffer.append(current_center)

        if previous_center is not None:
            dx = current_center[0] - previous_center[0]
            dy = current_center[1] - previous_center[1]

            distance_moved = np.sqrt(dx**2 + dy**2)

            if distance_moved > movement_threshold:
                direction = ""

                if abs(dx) > abs(dy):
                    direction = "→ Right" if dx > 0 else "← Left"
                else:
                    direction = "↓ Down" if dy > 0 else "↑ Up"

                if previous_direction != direction:
                    print(f"Movement direction of object with the center at {current_center} is {direction}. ")
                    previous_direction = direction
                stale_frame_count = 0
                is_stationary = False

            else:
                stale_frame_count += 1

                if stale_frame_count >= stale_frames_threshold and not is_stationary:
                    is_stationary = True
                    print(f"Object with the center at {current_center} is stationary.")

        previous_center = current_center

    else:
        previous_center = None

        if detection_buffer:
            last_known_center = detection_buffer[-1]

            cv2.circle(frame, last_known_center, radius=5,
                       color=(255, 255,255), thickness=-1)

    cv2.imshow('Circle Detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()

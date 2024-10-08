def main():
    print(countTens(1, 2, 3))
    print(countTens(0, 0, 4))
    print(countTens(100, 100, 3))
    print(countTens(100, 200, 300))

def countTens(twos, threes, fours):
    tens = 0
    while fours > 0 or threes > 1 or twos > 0:
        if fours > 0 and threes > 1:
            fours -= 1
            threes -= 2
        elif fours > 1 and twos > 0:
            fours -= 2
            twos -= 1
        elif threes > 1 and twos > 1:
            threes -= 2
            twos -= 2
        elif fours > 0 and twos > 2:
            fours -= 1
            twos -= 3
        elif twos > 4:
            twos -= 5
        else:
            break
        tens += 1

    return tens



if __name__ == '__main__':
    main()
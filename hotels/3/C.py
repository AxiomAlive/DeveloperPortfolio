def main():
    weights = [2, 3, 4, 5]
    values = [3, 4, 5, 6]
    max_weight = 5

    print(findMaximalValue(weights, values, max_weight))


def findMaximalValue(w, v, max_w):
    number_of_items = len(w)
    dp = [[0 for _ in range(max_w + 1)] for _ in range(number_of_items + 1)]

    for j in range(max_w + 1):
        dp[0][j] = 0

    for i in range(1, number_of_items+1):
        for j in range(max_w + 1):
            if w[i - 1] > j:
                dp[i][j] = dp[i - 1][j]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - w[i - 1]] + v[i - 1])
    # print(dp)

    return dp[number_of_items][max_w]


if __name__ == '__main__':
    main()
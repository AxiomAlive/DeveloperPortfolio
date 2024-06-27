import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Solutions {

    // Предполагается, что a < b.
    // N = b - a.
    // Временная сложность O(N*log(a)).
    static int greatestCommonDivisorOfGivenRange(int a, int b) {
        if (a >= b) {
            System.out.println("Диапазон должен составлять как минимум два числа, при чем a < b.");
            return 1;
        }

        // Создаем диапазон значений.
        var range = IntStream.range(a, b + 1).boxed().collect(Collectors.toList());

        var gcd = range.get(0);
        for (int i = 1; i < range.size(); i++) {
        // Проходя по диапазону считаем НОД для x = gcd(x, y) и y = следующее число из диапазона.
            gcd = calculateGCD(gcd, range.get(i));

            if(gcd == 1) {
                return 1;
            }
        }

        return gcd;
    }

    static int minimalPowerOfTwoThatEqualsToArraySum(int[] array) {
        var arraySum = Arrays.stream(array).sum();
        var powerOfTwo = (int)Math.round(Math.log(arraySum) / Math.log(2));
        if (Math.pow(2, powerOfTwo) < arraySum) {
            powerOfTwo++;
        }
        return powerOfTwo;

    }

    public static void printMultiplicationTable(int maxTableValue) {
        System.out.println("  " + IntStream.range(1, maxTableValue + 1).mapToObj(String::valueOf).collect(Collectors.joining(" ")));

        for (int i = 1; i <= maxTableValue; i++) {
            var multiplier = i;
            System.out.println(i + " " + IntStream.range(1, maxTableValue + 1).mapToObj(n -> String.valueOf(n*multiplier)).collect(Collectors.joining(" ")));
        }
    }

    public static void printPrimesInBetween(int rangeStart, int rangeEnd) {
        var primes = new ArrayList<Integer>();
        for (int i = Math.max(2, rangeStart); i <= rangeEnd; i++) {
            var isPrime = true;
            for (int j = 2; j <= Math.floor(Math.sqrt(i)); j++) {
                if (i % j == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.add(i);
            }
        }
        System.out.println(primes);
    }

    public static void printNumberOfComputersWithRespectToDeclension(int number) {
        var computer = new StringBuilder("компьютер");

        var numberStringified = String.valueOf(number);
        var numberLength = numberStringified.length();
        var numberEnding = 0;
        if (numberStringified.length() > 1) {
            numberEnding = Integer.parseInt(String.valueOf(numberStringified.charAt(numberLength-2)) + numberStringified.charAt(numberLength-1));
        } else {
            numberEnding = number;
        }
        if (numberEnding > 4 && numberEnding < 21) {
            computer.append("ов");
        } else if ((numberEnding > 1 && numberEnding < 5 && numberLength == 1) || (numberEnding % 10 > 1 && numberEnding % 10 < 5)) {
            computer.append("a");
        } else if ((numberEnding != 1 && numberLength == 1) || (numberEnding % 10 != 1)) {
            computer.append("ов");
        }
        System.out.println(number + " " + computer);
    }

    static int calculateGCD(int a, int b) {
    // Здесь используем алгоритм Евклида. a < b, тогда по Евклиду, НОД(a, b) останется прежним, даже если мы заменим b на a % b.
        if (b == 0)
            return a;
        return calculateGCD(b, a % b);
    }

//    static int findGCD(List<Integer> numbers) {
//        var result = numbers.get(0);
//        for (int i = 1; i < numbers.size(); i++) {
//            result = gcd(result, numbers.get(i));
//
//            if(result == 1)
//            {
//                return 1;
//            }
//        }
//
//        return result;
//    }

//    public static void findAllCommonDivisors(long[] numbers) {
//        var commonDivisors = new ArrayList<Long>();
//
//        var greatestCommonDivisor = findGCD(Arrays.stream(numbers).boxed().collect(Collectors.toList()));
//
//        for (long i = 2; i <= Math.floor(Math.sqrt(greatestCommonDivisor)); i++) {
//            if (greatestCommonDivisor % i == 0) {
//                commonDivisors.add(i);
//            }
//        }
//
//        commonDivisors.add(greatestCommonDivisor);
//        System.out.println(commonDivisors);
//    }

    public static void main(String[] args) {
//        drawMultiplicationTable(5);
//        printPrimesInBetween(1, 100000);
//        printNumberOfComputersWithRespectToDeclension(0);
//        findAllCommonDivisors(new long[]{10, 1000000000000L, 100000000, 1000});
//        System.out.println(minimalPowerOfTwoThatEqualsToArraySum(new int[]{90,85,55,34,41}));
//        System.out.println(minimalPowerOfTwoThatEqualsToArraySum(new long[]{1,2,3,8,11}));
        greatestCommonDivisorOfGivenRange(0, 100);
    }

}

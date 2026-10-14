/**
 * Java Lab PDF Personalizer - Lab Data
 * All 36 Java lab questions extracted directly from the attached lab PDFs.
 */

window.LAB_DATA = {
  layouts: {
    vscode: {
      name: "VS Code (Windows PowerShell)",
      displayName: "VS Code (PowerShell)",
      icon: "💻",
      promptTemplate: "PS C:\\{{FOLDER}}>",
      compileCmd: "PS C:\\{{FOLDER}}> javac Codechef.java",
      runCmd: "PS C:\\{{FOLDER}}> java Codechef",
      packageCompileCmd: "PS C:\\{{FOLDER}}> javac P1\\Calculator.java P2\\Implement.java",
      packageRunCmd: "PS C:\\{{FOLDER}}> java P2.Implement",
      titleBar: "PROBLEMS   OUTPUT   DEBUG CONSOLE   TERMINAL   PORTS       powershell   +   v   =   ^   x",
      terminalStyle: {
        bg: "#181818",
        fg: "#cccccc",
        promptColor: "#cccccc",
        commandColor: "#dcdcaa",
        titleBarBg: "#1f1f1f",
        titleBarFg: "#858585"
      }
    },
    mac: {
      name: "Mac Terminal (zsh)",
      displayName: "Mac Terminal (zsh)",
      icon: "🍎",
      promptTemplate: "{{USER}}@MacBook-Air {{NAME}} %",
      compileCmd: "{{USER}}@MacBook-Air {{NAME}} % javac Codechef.java",
      runCmd: "{{USER}}@MacBook-Air {{NAME}} % java Codechef",
      packageCompileCmd: "{{USER}}@MacBook-Air {{NAME}} % javac P1/Calculator.java P2/Implement.java",
      packageRunCmd: "{{USER}}@MacBook-Air {{NAME}} % java P2.Implement",
      titleBar: "{{NAME}} - -zsh - 80x24",
      terminalStyle: {
        bg: "#ffffff",
        fg: "#000000",
        promptColor: "#000000",
        commandColor: "#000000",
        titleBarBg: "#e8e8e8",
        titleBarFg: "#4a4a4a",
        borderColor: "#b0b0b0"
      }
    },
    cmd: {
      name: "Windows CMD",
      displayName: "Windows CMD",
      icon: "⊞",
      promptTemplate: "C:\\{{FOLDER}}>",
      compileCmd: "C:\\{{FOLDER}}>javac Codechef.java",
      runCmd: "C:\\{{FOLDER}}>java Codechef",
      packageCompileCmd: "C:\\{{FOLDER}}>javac P1\\Calculator.java P2\\Implement.java",
      packageRunCmd: "C:\\{{FOLDER}}>java P2.Implement",
      titleBar: "Command Prompt",
      terminalStyle: {
        bg: "#0c0c0c",
        fg: "#cccccc",
        promptColor: "#cccccc",
        commandColor: "#cccccc",
        titleBarBg: "#ffffff",
        titleBarFg: "#111111"
      }
    },
    codechef: {
      name: "CodeChef (Online IDE)",
      displayName: "CodeChef (Online IDE)",
      icon: "⚡",
      promptTemplate: "Status : Successfully executed",
      compileCmd: "",
      runCmd: "",
      titleBar: "Status :   Successfully executed",
      terminalStyle: {
        bg: "#10141f",
        fg: "#ffffff",
        promptColor: "#ffffff",
        titleBarBg: "#dcdfe4",
        titleBarFg: "#111111"
      }
    },
    linux: {
      name: "Linux (Ubuntu Terminal)",
      displayName: "Linux (Ubuntu)",
      icon: "🐧",
      promptTemplate: "{{USER}}@ubuntu:~/{{FOLDER}}$",
      compileCmd: "{{USER}}@ubuntu:~/{{FOLDER}}$ javac Codechef.java",
      runCmd: "{{USER}}@ubuntu:~/{{FOLDER}}$ java Codechef",
      packageCompileCmd: "{{USER}}@ubuntu:~/{{FOLDER}}$ javac P1/Calculator.java P2/Implement.java",
      packageRunCmd: "{{USER}}@ubuntu:~/{{FOLDER}}$ java P2.Implement",
      titleBar: "{{USER}}@ubuntu: ~/{{FOLDER}}",
      terminalStyle: {
        bg: "#300a24",
        fg: "#ffffff",
        promptColor: "#4ce64c",
        titleBarBg: "#2d2d2d",
        titleBarFg: "#ffffff"
      }
    }
  },

  questions: [
    {
      id: 1,
      question: 'Write a Java program to print "Hello world".',
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        System.out.println("Hello world");
    }
}`,
      output: ["Hello world"]
    },
    {
      id: 2,
      question: "Write a Java program to perform addition of two numbers.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int a = 15;
        int b = 25;
        int sum = a + b;
        System.out.println("Sum of " + a + " and " + b + " is " + sum);
    }
}`,
      output: ["Sum of 15 and 25 is 40"]
    },
    {
      id: 3,
      question: "Write a Java program to make a calculator.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int a = 20;
        int b = 5;
        char[] operators = {'+', '-', '*', '/'};
        for (char op : operators) {
            int result = 0;
            switch (op) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = a / b;
                    break;
            }
            System.out.println(a + " " + op + " " + b + " = " + result);
        }
    }
}`,
      output: [
        "20 + 5 = 25",
        "20 - 5 = 15",
        "20 * 5 = 100",
        "20 / 5 = 4"
      ]
    },
    {
      id: 4,
      question: "Write a Java program to calculate the volume of a box and print the result.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int length = 5;
        int width = 4;
        int height = 3;
        int volume = length * width * height;
        System.out.println("Volume of the box is " + volume);
    }
}`,
      output: ["Volume of the box is 60"]
    },
    {
      id: 5,
      question: "Write a Java program to find the factorial of a given number.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int n = 5;
        long factorial = 1;
        for (int i = 1; i <= n; i++) {
            factorial = factorial * i;
        }
        System.out.println("Factorial of " + n + " is " + factorial);
    }
}`,
      output: ["Factorial of 5 is 120"]
    },
    {
      id: 6,
      question: "Write a Java program to print the Fibonacci series up to n terms.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int n = 10;
        int a = 0;
        int b = 1;
        System.out.println("Fibonacci series up to " + n + " terms:");
        for (int i = 1; i <= n; i++) {
            System.out.print(a + " ");
            int next = a + b;
            a = b;
            b = next;
        }
    }
}`,
      output: [
        "Fibonacci series up to 10 terms:",
        "0 1 1 2 3 5 8 13 21 34"
      ]
    },
    {
      id: 7,
      question: "Write a Java program to check whether a number is an Armstrong number or not.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int number = 153;
        int original = number;
        int digits = String.valueOf(number).length();
        int sum = 0;
        while (number > 0) {
            int digit = number % 10;
            sum = sum + (int) Math.pow(digit, digits);
            number = number / 10;
        }
        if (sum == original) {
            System.out.println(original + " is an Armstrong number.");
        } else {
            System.out.println(original + " is not an Armstrong number.");
        }
    }
}`,
      output: ["153 is an Armstrong number."]
    },
    {
      id: 8,
      question: "Write a Java program to print the prime numbers up to integer 150.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int count = 0;
        for (int i = 2; i <= 150; i++) {
            boolean isPrime = true;
            for (int j = 2; j * j <= i; j++) {
                if (i % j == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                System.out.print(i + " ");
                count++;
                if (count % 10 == 0) {
                    System.out.println();
                }
            }
        }
    }
}`,
      output: [
        "2 3 5 7 11 13 17 19 23 29 ",
        "31 37 41 43 47 53 59 61 67 71 ",
        "73 79 83 89 97 101 103 107 109 113 ",
        "127 131 137 139 149"
      ]
    },
    {
      id: 9,
      question: "Write a Java program to print a diamond shape using asterisks.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      output: [
        " *",
        " ***",
        " *****",
        " *******",
        "*********",
        " *******",
        " *****",
        " ***",
        " *"
      ]
    },
    {
      id: 10,
      question: "Write a Java program to check whether a given number is even or odd.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int number = 7;
        if (number % 2 == 0) {
            System.out.println(number + " is Even.");
        } else {
            System.out.println(number + " is Odd.");
        }
    }
}`,
      output: ["7 is Odd."]
    },
    {
      id: 11,
      question: "Write a Java program to check whether the given alphabet is a vowel or consonant.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        char ch = 'e';
        char lower = Character.toLowerCase(ch);
        if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {
            System.out.println(ch + " is a Vowel.");
        } else {
            System.out.println(ch + " is a Consonant.");
        }
    }
}`,
      output: ["e is a Vowel."]
    },
    {
      id: 12,
      question: "Write a Java program to find the greatest among two integers.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int a = 45;
        int b = 78;
        if (a > b) {
            System.out.println(a + " is the greatest.");
        } else if (b > a) {
            System.out.println(b + " is the greatest.");
        } else {
            System.out.println("Both numbers are equal.");
        }
    }
}`,
      output: ["78 is the greatest."]
    },
    {
      id: 13,
      question: "Write a Java program to find the greatest among three integers.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int a = 34;
        int b = 89;
        int c = 56;
        if (a >= b && a >= c) {
            System.out.println(a + " is the greatest.");
        } else if (b >= a && b >= c) {
            System.out.println(b + " is the greatest.");
        } else {
            System.out.println(c + " is the greatest.");
        }
    }
}`,
      output: ["89 is the greatest."]
    },
    {
      id: 14,
      question: "Write a Java program to find the volume of two different boxes using a parameterised constructor call.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        Box box1 = new Box(5, 4, 3);
        Box box2 = new Box(10, 6, 2.5);
        System.out.println("Volume of Box 1 = " + box1.volume());
        System.out.println("Volume of Box 2 = " + box2.volume());
    }
}

class Box {
    double length;
    double width;
    double height;
    Box(double length, double width, double height) {
        this.length = length;
        this.width = width;
        this.height = height;
    }
    double volume() {
        return length * width * height;
    }
}`,
      output: [
        "Volume of Box 1 = 60.0",
        "Volume of Box 2 = 150.0"
      ]
    },
    {
      id: 15,
      question: "Write a Java program to create a 1D array with any number of elements, increment each element by a constant factor and print the result.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int[] arr = {10, 20, 30, 40, 50};
        int factor = 5;
        for (int i = 0; i < arr.length; i++) {
            arr[i] = arr[i] + factor;
        }
        System.out.println("Array after incrementing each element by " + factor + ":");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}`,
      output: [
        "Array after incrementing each element by 5:",
        "15 25 35 45 55"
      ]
    },
    {
      id: 16,
      question: "Write a Java program to reverse an already existing 1D array and print it.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int[] arr = {1, 2, 3, 4, 5, 6};
        int n = arr.length;
        for (int i = 0; i < n / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[n - 1 - i];
            arr[n - 1 - i] = temp;
        }
        System.out.println("Reversed array:");
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}`,
      output: [
        "Reversed array:",
        "6 5 4 3 2 1"
      ]
    },
    {
      id: 17,
      question: "Write a Java program to add two 2D arrays and print the result.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int[][] a = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] b = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
        int[][] sum = new int[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                sum[i][j] = a[i][j] + b[i][j];
            }
        }
        System.out.println("Sum of the two matrices:");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(sum[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
      output: [
        "Sum of the two matrices:",
        "10 10 10",
        "10 10 10",
        "10 10 10"
      ]
    },
    {
      id: 18,
      question: "Write a Java program to multiply two 2D matrices and print the result.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int[][] a = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] b = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
        int[][] product = new int[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 3; k++) {
                    product[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        System.out.println("Product of the two matrices:");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(product[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
      output: [
        "Product of the two matrices:",
        "30 24 18",
        "84 69 54",
        "138 114 90"
      ]
    },
    {
      id: 19,
      question: "Write a Java program to check whether a number is a palindrome or not.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int number = 121;
        int original = number;
        int reverse = 0;
        while (number > 0) {
            reverse = reverse * 10 + number % 10;
            number = number / 10;
        }
        if (original == reverse) {
            System.out.println(original + " is a Palindrome.");
        } else {
            System.out.println(original + " is not a Palindrome.");
        }
    }
}`,
      output: ["121 is a Palindrome."]
    },
    {
      id: 20,
      question: 'Write a Java program to find all occurrences of "is" using indexOf() in a given string.',
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        String text = "This is a sample text, and this island is nice";
        int index = text.indexOf("is");
        while (index != -1) {
            System.out.println("\\"is\\" found at index " + index);
            index = text.indexOf("is", index + 1);
        }
    }
}`,
      output: [
        '"is" found at index 2',
        '"is" found at index 5',
        '"is" found at index 29',
        '"is" found at index 32',
        '"is" found at index 39'
      ]
    },
    {
      id: 21,
      question: 'Write a Java program to check whether the text contains a substring that starts with "the".',
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        String text = "Then the teacher said there is nothing to worry about";
        String[] words = text.split(" ");
        boolean found = false;
        for (String word : words) {
            if (word.startsWith("the")) {
                System.out.println("Substring starting with \\"the\\" found: " + word);
                found = true;
            }
        }
        if (!found) {
            System.out.println("No substring starting with \\"the\\" found.");
        }
    }
}`,
      output: [
        'Substring starting with "the" found: the',
        'Substring starting with "the" found: there'
      ]
    },
    {
      id: 22,
      question: 'Write a Java program to check whether the text contains a substring that ends with "ed".',
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        String text = "The painter finished the painted wall and stopped";
        String[] words = text.split(" ");
        boolean found = false;
        for (String word : words) {
            if (word.endsWith("ed")) {
                System.out.println("Substring ending with \\"ed\\" found: " + word);
                found = true;
            }
        }
        if (!found) {
            System.out.println("No substring ending with \\"ed\\" found.");
        }
    }
}`,
      output: [
        'Substring ending with "ed" found: finished',
        'Substring ending with "ed" found: painted',
        'Substring ending with "ed" found: stopped'
      ]
    },
    {
      id: 23,
      question: "Write a Java program to arrange the words in the text in alphabetical order (same as dictionary order).",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        String text = "banana Apple mango cherry Grape orange";
        String[] words = text.split(" ");
        Arrays.sort(words, String.CASE_INSENSITIVE_ORDER);
        System.out.println("Words in alphabetical order:");
        for (String word : words) {
            System.out.print(word + " ");
        }
    }
}`,
      output: [
        "Words in alphabetical order:",
        "Apple banana cherry Grape mango orange"
      ]
    },
    {
      id: 24,
      question: "Write a Java program to create a class known as BankAccount with methods deposit() and withdraw(). Create a subclass called SavingAccount that overrides the withdraw() method to prevent withdrawal if the account balance falls below 100.",
      forceNewPageForTerminal: true,
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        BankAccount account = new SavingAccount(500);
        account.deposit(200);
        account.withdraw(300);
        account.withdraw(350);
    }
}

class BankAccount {
    protected double balance;
    BankAccount(double balance) {
        this.balance = balance;
    }
    void deposit(double amount) {
        balance = balance + amount;
        System.out.println("Deposited: " + amount + ", Balance: " + balance);
    }
    void withdraw(double amount) {
        if (amount <= balance) {
            balance = balance - amount;
            System.out.println("Withdrawn: " + amount + ", Balance: " + balance);
        } else {
            System.out.println("Insufficient balance.");
        }
    }
}

class SavingAccount extends BankAccount {
    SavingAccount(double balance) {
        super(balance);
    }
    @Override
    void withdraw(double amount) {
        if (balance - amount < 100) {
            System.out.println("Withdrawal denied. Balance cannot fall below 100.");
        } else {
            balance = balance - amount;
            System.out.println("Withdrawn: " + amount + ", Balance: " + balance);
        }
    }
}`,
      output: [
        "Deposited: 200.0, Balance: 700.0",
        "Withdrawn: 300.0, Balance: 400.0",
        "Withdrawal denied. Balance cannot fall below 100."
      ]
    },
    {
      id: 25,
      question: "Write a Java program to create a class called Shape with methods called getParameter() and getArea(). Create a subclass called Circle that overrides getParameter() and getArea() methods to calculate the perimeter and area of a circle.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        Shape shape = new Circle(5);
        System.out.printf("Perimeter of the circle = %.2f%n", shape.getParameter());
        System.out.printf("Area of the circle = %.2f%n", shape.getArea());
    }
}

class Shape {
    double getParameter() {
        return 0;
    }
    double getArea() {
        return 0;
    }
}

class Circle extends Shape {
    double radius;
    Circle(double radius) {
        this.radius = radius;
    }
    @Override
    double getParameter() {
        return 2 * Math.PI * radius;
    }
    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
}`,
      output: [
        "Perimeter of the circle = 31.42",
        "Area of the circle = 78.54"
      ]
    },
    {
      id: 26,
      question: "Write a Java program that contains a class Calculation having a method add() which returns a number after adding, and a default constructor. Create class B which extends Calculation and accesses the method add(). Create another class DisplayDetails which extends B and accesses the methods of both Calculation and B. Create another class Demo which accesses the DisplayDetails method to display the result.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        Demo demo = new Demo();
        demo.show();
    }
}

class Calculation {
    Calculation() {
        System.out.println("Calculation constructor called");
    }
    int add(int a, int b) {
        return a + b;
    }
}

class B extends Calculation {
    int addNumbers(int a, int b) {
        return add(a, b);
    }
}

class DisplayDetails extends B {
    void display() {
        System.out.println("Sum from Calculation class: " + add(10, 20));
        System.out.println("Sum from class B: " + addNumbers(30, 40));
    }
}

class Demo {
    void show() {
        DisplayDetails details = new DisplayDetails();
        details.display();
    }
}`,
      output: [
        "Calculation constructor called",
        "Sum from Calculation class: 30",
        "Sum from class B: 70"
      ]
    },
    {
      id: 27,
      question: "Create an abstract class Employee with abstract method to calculate salary and a method to display details. Implement two subclasses Manager and Worker which extend Employee and implement the abstract method. Create another class SalesPerson which extends Manager and overrides the necessary methods.",
      forceNewPageForTerminal: true,
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        Employee e1 = new Manager("Rahul", 101, 50000, 10000);
        Employee e2 = new Worker("Amit", 102, 160, 250);
        Employee e3 = new SalesPerson("Neha", 103, 30000, 5000, 200000, 2.5);
        e1.displayDetails();
        e2.displayDetails();
        e3.displayDetails();
    }
}

abstract class Employee {
    String name;
    int id;
    Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }
    abstract double calculateSalary();
    void displayDetails() {
        System.out.println("ID: " + id + ", Name: " + name + ", Salary: " + calculateSalary());
    }
}

class Manager extends Employee {
    double basic;
    double allowance;
    Manager(String name, int id, double basic, double allowance) {
        super(name, id);
        this.basic = basic;
        this.allowance = allowance;
    }
    @Override
    double calculateSalary() {
        return basic + allowance;
    }
}

class Worker extends Employee {
    int hours;
    double rate;
    Worker(String name, int id, int hours, double rate) {
        super(name, id);
        this.hours = hours;
        this.rate = rate;
    }
    @Override
    double calculateSalary() {
        return hours * rate;
    }
}

class SalesPerson extends Manager {
    double sales;
    double commissionRate;
    SalesPerson(String name, int id, double basic, double allowance, double sales, double commissionRate) {
        super(name, id, basic, allowance);
        this.sales = sales;
        this.commissionRate = commissionRate;
    }
    @Override
    double calculateSalary() {
        return super.calculateSalary() + sales * commissionRate / 100;
    }
    @Override
    void displayDetails() {
        super.displayDetails();
        System.out.println("Sales: " + sales + ", Commission Rate: " + commissionRate + "%");
    }
}`,
      output: [
        "ID: 101, Name: Rahul, Salary: 60000.0",
        "ID: 102, Name: Amit, Salary: 40000.0",
        "ID: 103, Name: Neha, Salary: 40000.0",
        "Sales: 200000.0, Commission Rate: 2.5%"
      ]
    },
    {
      id: 28,
      question: "Write a Java program to create a base class Sports with method play(). Create three subclasses Football, Basketball and Rugby. Override the play() method in each subclass to print a specific statement for each sport.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        Sports s1 = new Football();
        Sports s2 = new Basketball();
        Sports s3 = new Rugby();
        s1.play();
        s2.play();
        s3.play();
    }
}

class Sports {
    void play() {
        System.out.println("Playing a sport");
    }
}

class Football extends Sports {
    @Override
    void play() {
        System.out.println("Football: Players kick the ball into the goal.");
    }
}

class Basketball extends Sports {
    @Override
    void play() {
        System.out.println("Basketball: Players shoot the ball through the hoop.");
    }
}

class Rugby extends Sports {
    @Override
    void play() {
        System.out.println("Rugby: Players carry the ball and score tries.");
    }
}`,
      output: [
        "Football: Players kick the ball into the goal.",
        "Basketball: Players shoot the ball through the hoop.",
        "Rugby: Players carry the ball and score tries."
      ]
    },
    {
      id: 29,
      question: "Write a Java program to create an interface Flyable with a method fly(). Create three classes SpaceCraft, Airplane and Helicopter that implement Flyable and implement the fly() method in each class.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        Flyable f1 = new SpaceCraft();
        Flyable f2 = new Airplane();
        Flyable f3 = new Helicopter();
        f1.fly();
        f2.fly();
        f3.fly();
    }
}

interface Flyable {
    void fly();
}

class SpaceCraft implements Flyable {
    public void fly() {
        System.out.println("SpaceCraft flies into outer space.");
    }
}

class Airplane implements Flyable {
    public void fly() {
        System.out.println("Airplane flies in the sky using wings.");
    }
}

class Helicopter implements Flyable {
    public void fly() {
        System.out.println("Helicopter flies using rotating blades.");
    }
}`,
      output: [
        "SpaceCraft flies into outer space.",
        "Airplane flies in the sky using wings.",
        "Helicopter flies using rotating blades."
      ]
    },
    {
      id: 30,
      question: "Write a Java program to create an interface Sortable with a method sort() that sorts an array of integers in ascending order. Create two classes BubbleSort and SelectionSort that implement the Sortable interface and provide their own implementation of the sort() method.",
      forceNewPageForTerminal: true,
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        int[] a1 = {64, 25, 12, 22, 11};
        int[] a2 = {29, 10, 14, 37, 13};
        Sortable s1 = new BubbleSort();
        Sortable s2 = new SelectionSort();
        s1.sort(a1);
        s2.sort(a2);
        System.out.println("Bubble Sort: " + Arrays.toString(a1));
        System.out.println("Selection Sort: " + Arrays.toString(a2));
    }
}

interface Sortable {
    void sort(int[] arr);
}

class BubbleSort implements Sortable {
    public void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}

class SelectionSort implements Sortable {
    public void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int min = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            int temp = arr[min];
            arr[min] = arr[i];
            arr[i] = temp;
        }
    }
}`,
      output: [
        "Bubble Sort: [11, 12, 22, 25, 64]",
        "Selection Sort: [10, 13, 14, 29, 37]"
      ]
    },
    {
      id: 31,
      question: "Write a Java program which creates a package P1 having a class Calculator, then create another package P2 and create a class Implement in package P2 which will use the methods of class Calculator for performing calculation operations.",
      isPackageQuestion: true,
      code: `P1/Calculator.java
package P1;
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    public int subtract(int a, int b) {
        return a - b;
    }
    public int multiply(int a, int b) {
        return a * b;
    }
    public int divide(int a, int b) {
        return a / b;
    }
}

P2/Implement.java
package P2;
import P1.Calculator;
public class Implement {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Addition: " + calc.add(20, 10));
        System.out.println("Subtraction: " + calc.subtract(20, 10));
        System.out.println("Multiplication: " + calc.multiply(20, 10));
        System.out.println("Division: " + calc.divide(20, 10));
    }
}`,
      output: [
        "Addition: 30",
        "Subtraction: 10",
        "Multiplication: 200",
        "Division: 2"
      ]
    },
    {
      id: 32,
      question: "Write a Java program for a custom checked exception InsufficientFundsException, thrown when the account balance falls below 500.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        Account account = new Account(2000);
        try {
            account.withdraw(1000);
            account.withdraw(800);
        } catch (InsufficientFundsException e) {
            System.out.println("Exception: " + e.getMessage());
        }
    }
}

class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) {
        super(message);
    }
}

class Account {
    double balance;
    Account(double balance) {
        this.balance = balance;
    }
    void withdraw(double amount) throws InsufficientFundsException {
        if (balance - amount < 500) {
            throw new InsufficientFundsException("Insufficient funds, balance cannot fall below 500");
        }
        balance = balance - amount;
        System.out.println("Withdrawn: " + amount + ", Balance: " + balance);
    }
}`,
      output: [
        "Withdrawn: 1000.0, Balance: 1000.0",
        "Exception: Insufficient funds, balance cannot fall below 500"
      ]
    },
    {
      id: 33,
      question: "Create an anonymous class that implements an interface and overrides a method.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        Greeting greeting = new Greeting() {
            @Override
            public void sayHello() {
                System.out.println("Hello from the anonymous class");
            }
        };
        greeting.sayHello();
    }
}

interface Greeting {
    void sayHello();
}`,
      output: ["Hello from the anonymous class"]
    },
    {
      id: 34,
      question: "Write a Java program that prints the values from 1 to 10 with a pause of 1000 milliseconds in each iteration.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        for (int i = 1; i <= 10; i++) {
            System.out.println(i);
            Thread.sleep(1000);
        }
    }
}`,
      output: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ]
    },
    {
      id: 35,
      question: "Write a Java program that creates a thread by implementing the Runnable interface.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        MyRunnable task = new MyRunnable();
        Thread thread = new Thread(task);
        thread.start();
        thread.join();
    }
}

class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Thread is running using the Runnable interface");
    }
}`,
      output: ["Thread is running using the Runnable interface"]
    },
    {
      id: 36,
      question: "Write a Java program that creates two threads which print the name of the thread 3 times each, by extending the Thread class.",
      code: `import java.util.*;
import java.lang.*;
import java.io.*;

class Codechef {
    public static void main(String[] args) throws java.lang.Exception {
        MyThread t1 = new MyThread("Thread-1");
        MyThread t2 = new MyThread("Thread-2");
        t1.start();
        t2.start();
        t1.join();
        t2.join();
    }
}

class MyThread extends Thread {
    MyThread(String name) {
        super(name);
    }
    public void run() {
        for (int i = 0; i < 3; i++) {
            System.out.println(getName());
        }
    }
}`,
      output: [
        "Thread-1",
        "Thread-1",
        "Thread-1",
        "Thread-2",
        "Thread-2",
        "Thread-2"
      ]
    }
  ]
};

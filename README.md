# Finnish Social Security Number Generators

The code in this repository can be used to generate Finnish social security numbers (SSN) with a variety of different parameters. The code is implemented in different languages with near identical function names etc. (ignoring language specific semantic best practices).

Currently the code is implemented in:

- JavaScript
- Python

## Features

Currently the code features:

- Generate an SSN for a person exactly of age `x`
- Generate an SSN for a person almost of age `x` (one day from)
- Generate an SSN for a person barely of age `x` (one day over)
- Generate an SSN for a person between the ages of `x` and `y`

## Missing features

**The sex of the person** is purely random. Adding sex as an optional parameter would allow for greater control over the output. _This feature was omitted due to the fact that the sex of the person should be irrelevant in a business setting._

**The identity number** always lands in the _"normal"_ range, with no opportunity to decide whether it should be in the normal range, the special range, or both.

The entire SSN system is being redesigned. This should be taken into account in the future.
[Read more about the upcoming changes here.](https://vm.fi/en/project-on-redesigning-the-system-of-personal-identity-codes)

## How to form a Finnish SSN

Finnish SSN's are made up of the following different parts:

- date of birth (`ddmmyy`)
- delimiter (`+`, `-`, or `A` depending on the century of birth)
- identity number (`nnn` between 2 and 899, 900-999 are reserved for special situations)
- check symbol (i.e. the _"hash"_ of the parts up until this point)

### Date of birth

The date of birth should be a 6-digit value consisting of the day (of the month), month and year of birth. In case the value is less than 10 (i.e. only one digit in length), then it should be padded with a zero ("0").

**Example:** A person born on the second of July, 2004.

**Result:** `020704`

### Delimiter

The delimiter is determined as follows:

- Person was born in the 19th century = `+`
- Person was born in the 20th century = `-`
- Person was born in the 21st century = `A`

### Identity number

The identity number is the zero-padded, 3-digit placement/positional number of the birth on that particular date of birth. I.e. If the identity number of a person is `008`, roughly speaking it means that the person was the 8th person born on that day.

**The identity number is always even for females and odd for males.**

Under normal circumstances, the number is between 2 and 899 (inclusive). The numbers 900 to 999 are reserved for special situations, for example in hospitals where the SSN of a patient is not known.

### Check symbol

The check symbol is formed as follows:

1. Concatenate the previously formed 6-digit date of birth with the 3-digit identity number to form a new 9-digit number
2. Get the remainder (modulus) of the equation of dividing the 9-digit number with 31
3. Select the correct symbol from the check symbol table

The check symbol table looks like this:

```txt
Remainer  Check Symboöl
0         0
1         1
2         2
3         3
4         4
5         5
6         6
7         7
8         8
9         9
10        A
11        B
12        C
13        D
14        E
15        F
16        H
17        J
18        K
19        L
20        M
21        N
22        P
23        R
24        S
25        T
26        U
27        V
28        W
29        X
30        Y
```

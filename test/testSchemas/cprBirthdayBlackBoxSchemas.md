# Black Box Test Schemas

## Partitions and 3-value boundaries analysis

### CPR Handler:

---

#### The 10 Numeric Digits for CPR number Rule

| Partition type |             Partitions |                                           Test case values | Expected output |        Boundary values |                       Test case values |
| -------------- | ---------------------: | ---------------------------------------------------------: | --------------: | ---------------------: | -------------------------------------: |
| Invalid        |     not numeric digits | " ", &, `@` -, +, a-z, A-Z, æ, Æ, ø, Ø, å, Å, "1212770123" |           Error |                    N/A |                                    N/A |
| Invalid        |           length = 0-9 |                                                      12345 |           Error | length = 0, length = 9 | "", 1, 12127701, 121277012, 1212770123 |
| Invalid        | length = 11 - Infinity |                                            121277012345678 |           Error |            length = 11 |  1212770123, 12127701234, 121277012345 |
| Valid          |            length = 10 |                                                 1212770123 |           Valid |            length = 10 |     121277012, 1212770123, 12127701234 |

#### List of test cases:

- Not Numeric: `a` `z` `æ` `ø` `å` `&` `@` `+` `-` `" "` `""` `"1212770123"`
- For length of numeric cpr: `1` `12127701` `121277012` `1212770123` `12127701234` `121277012345` `121277012345678`
- A length of a cpr number input cannot be minus, so it is not tested

---

#### The date of birth in the format ddMMyy

| Partition type |                                                                  Partitions |                             Test case values | Expected output |        Boundary values |               Test case values |
| -------------- | --------------------------------------------------------------------------: | -------------------------------------------: | --------------: | ---------------------: | -----------------------------: |
| Valid          |            birth day 'dd' or birth month 'MM' or birth year 'yy' = 2 digits |                                           12 |           Valid |             length = 2 |                     1, 12, 121 |
| Valid          |                    birth day 'dd' = 01 - 31 for month: 01,03,05,07,08,10,12 |                                           18 |           Valid |                 01, 31 |         00, 01, 02, 30, 31, 32 |
| Valid          |                             birth day 'dd' = 01 - 30 for month: 04,06,09,11 |                                           18 |           Valid |                  1, 30 |         00, 01, 02, 29, 30, 31 |
| Valid          |                     birth day 'dd' = 01 - 28 for month: 02 except leap year |                                           16 |           Valid |                 01, 28 |         00, 01, 02, 27, 28, 29 |
| Valid          |                            birth day 'dd' = 01 - 29 for month: 02 leap year |                                           16 |           Valid |                 01, 29 |         00, 01, 02, 28, 29, 30 |
| Valid          |                                                  birth month 'MM' = 01 - 12 |                                           06 |           Valid |                 01, 12 |         00, 01, 02, 11, 12, 13 |
| Valid          |                                                     birth year 'yy' 01 - 99 |                                           49 |           Valid |                 01, 99 |        00, 01, 02, 98, 99, 100 |
| Invalid        |             birth day 'dd' or birth month 'MM' or birth year 'yy' = 1 digit |                                            5 |           Error |             length = 1 |                      "", 1, 12 |
| Invalid        | birth day 'dd' or birth month 'MM' or birth year 'yy' = 3 - Infinite digits |                                     12127701 |           Error |             length = 3 |                  12, 121, 1212 |
| Valid          |                                        full date of birth ddMMyy = 6 digits |                                       121277 |           Valid |             length = 6 |         12127, 121277, 1212770 |
| Invalid        |                                      full date of birth ddMMyy = 1-5 digits |                                          121 |           Error | length = 1, length = 5 | "", 1, 12, 1212, 12127, 121277 |
| Invalid        |                             full date of birth ddMMyy = 7 - Infinite digits |                                    121277012 |           Error |             length = 7 |      121277, 1212770, 12127701 |
| Invalid        |                                                          not numeric digits | " ", &, `@` -, +, a-z, A-Z, æ, Æ, ø, Ø, å, Å |           Error |                    N/A |                            N/A |
| Invalid        |                                                           date of birth = 0 |                                            0 |           Error |                    N/A |                            N/A |

#### List of test cases:

- Not Numeric: `a` `z` `æ` `ø` `å` `&` `@` `+` `-` `" "` `""`
- For 'dd': `00` `01` `02` `16` `18` `27` `28` `29` `30` `31` `32`
- For 'MM': `00` `01` `02` `06` `11` `12` `13`
- For 'yy': `00` `01` `02` `49` `98` `99` `100`
- For length of each date part: `1` `5` `12` `121` `1212` `12127701`
- For length of full date of birth: `12127` `121277` `1212770` `121` `1` `12` `1212` `12127` `121277`

---

#### The last 4 random numbers with Gender Rule

| Partition type |                             Partitions |                                     Test case values | Expected output |        Boundary values |    Test case values |
| -------------- | -------------------------------------: | ---------------------------------------------------: | --------------: | ---------------------: | ------------------: |
| Invalid        |                     not numeric digits | " ", &, `@` -, +, a-z, A-Z, æ, Æ, ø, Ø, å, Å, "1212" |           Error |                    N/A |                 N/A |
| Invalid        |                           length = 0-3 |                                                   12 |           Error | length = 0, length = 3 |    "", 1, 333, 2034 |
| Invalid        |                  length = 5 - Infinity |                                             13332034 |           Error |             length = 5 | 2034, 33320, 333203 |
| Valid          |                             length = 4 |                                                 0245 |           Valid |             length = 4 |    333, 2034, 33320 |
| Valid          | gender 'female' = last digit 0,2,4,6,8 |                                                    6 |           Valid |      even numbers 0, 8 |       0, 1, 7, 8, 9 |
| Invalid        | gender 'female' = last digit 1,3,5,7,9 |                                                    5 |           Error |                    N/A |                 N/A |
| Valid          |   gender 'male' = last digit 1,3,5,7,9 |                                                    5 |           Valid |       odd numbers 1, 9 |       0, 1, 2, 7, 9 |
| Invalid        |   gender 'male' = last digit 0,2,4,6,8 |                                                    6 |           Error |                    N/A |                 N/A |

#### List of test cases:

- Not Numeric: `a` `z` `æ` `ø` `å` `&` `@` `+` `-` `" "` `""` `"1212"`
- For length of 4 last digits: `1` `333` `2034` `33320` `333203`
- For gender 'female': `0` `1` `6` `7` `8` `9`
- For gender 'male': `0` `1` `2` `5` `7` `9`

---

#### Date of Birth matching CPR date

| Partition type |                         Partitions |                                           Test case values | Expected output | Boundary values | Test case values |
| -------------- | ---------------------------------: | ---------------------------------------------------------: | --------------: | --------------: | ---------------: |
| Invalid        |                 not numeric digits | " ", &, `@` -, +, a-z, A-Z, æ, Æ, ø, Ø, å, Å, "1212770123" |           Error |             N/A |              N/A |
| Valid          | Female DoB = first 6 digits of CPR |                 female: DoB = 17-06-1976, cpr = 1706760124 |           Valid |             N/A |              N/A |
| Invalid        | Female DoB = first 6 digits of CPR |                 female: DoB = 17-06-1976, cpr = 1707660124 |           Error |             N/A |              N/A |
| Valid          |   Male DoB = first 6 digits of CPR |                   male: DoB = 04-11-1978, cpr = 0411780123 |           Valid |             N/A |              N/A |
| Invalid        |   Male DoB = first 6 digits of CPR |                   male: DoB = 04-11-1978, cpr = 1411780123 |           Error |             N/A |              N/A |

#### List of test cases:

- Not Numeric: `a` `z` `æ` `ø` `å` `&` `@` `+` `-` `" "` `""` `"1212770123"`
- Positive: `female: DoB = 17-06-1976, cpr = 1706760124` `male: DoB = 04-11-1978, cpr = 0411780123`
- Negative: `female: DoB = 17-06-1976, cpr = 1106760124` `male: DoB = 04-11-1978, cpr = 1411780123`

---

#### Gender matching CPR date

| Partition type |                         Partitions |                                           Test case values | Expected output | Boundary values | Test case values |
| -------------- | ---------------------------------: | ---------------------------------------------------------: | --------------: | --------------: | ---------------: |
| Invalid        |                 not numeric digits | " ", &, `@` -, +, a-z, A-Z, æ, Æ, ø, Ø, å, Å, "1212770123" |           Error |             N/A |              N/A |
| Valid          | Female DoB = first 6 digits of CPR |                 female: DoB = 17-06-1976, cpr = 1706760124 |           Valid |             N/A |              N/A |
| Invalid        | Female DoB = first 6 digits of CPR |                 female: DoB = 17-06-1976, cpr = 1706760123 |           Error |             N/A |              N/A |
| Valid          |   Male DoB = first 6 digits of CPR |                   male: DoB = 04-11-1978, cpr = 0411780123 |           Valid |             N/A |              N/A |
| Invalid        |   Male DoB = first 6 digits of CPR |                   male: DoB = 04-11-1978, cpr = 0411780128 |           Error |             N/A |              N/A |

#### List of test cases:

- Not Numeric: `a` `z` `æ` `ø` `å` `&` `@` `+` `-` `" "` `""` `"1212770123"`
- Positive: `female: DoB = 17-06-1976, cpr = 1706760124` `male: DoB = 04-11-1978, cpr = 0411780123`
- Negative: `female: DoB = 17-06-1976, cpr = 1706760123` `male: DoB = 04-11-1978, cpr = 0411780128`

---

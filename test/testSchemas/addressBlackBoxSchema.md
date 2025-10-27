# Black Box Test Schemas

## Partitions and 3-value boundaries analysis

### Address Repository:

---

#### The Street (random assortment of alphabetical characters)

| Partition type |                  Partitions |                   Test case values | Expected output | Boundary values | Test case values |
| -------------- | --------------------------: | ---------------------------------: | --------------: | --------------: | ---------------: |
| Invalid        | non alphabetical characters | " ", &, @, -, +, 0-9, "1212770123" |           Error |             N/A |              N/A |
| Invalid        |                  length = 0 |                                 "" |           Error |      length = 0 |        "", "str" |
| Valid          |                    a-å, A-Å |                     "Julemandsbøf" |           Valid |             N/A |              N/A |

#### List of test cases:

- Negative:
  - Non Alphabetical chars: `" "` `0-9` `æ` `ø` `å` `&` `@` `+` `-` `" "` `""` `"1212770123"`
  - Empty input: `""`
- Positive: `"Julemandsbøf"`

---

#### The Number (from 1 to 999 - optionally followed by uppercase letter e.g., 221B)

| Partition type |                              Partitions | Test case values | Expected output |        Boundary values |        Test case values |
| -------------- | --------------------------------------: | ---------------: | --------------: | ---------------------: | ----------------------: |
| Invalid        |                                 symbols |  " ", &, @, -, + |           Error |                    N/A |                     N/A |
| Invalid        |                  length = 4 to Infinite |             3234 |           Error |             length = 4 |        123, 1234, 12345 |
| Invalid        |                            only letters |              aBc |           Error |                    N/A |                     N/A |
| Invalid        |                   only lowercase letter |             221b |           Error |                    N/A |                     N/A |
| Invalid        |                    more than one letter |            221BB |           Error |                    N/A |                     N/A |
| Invalid        |                letter in wrong position |       B221, 2B21 |           Error |                    N/A |                     N/A |
| Invalid        |                              number = 0 |            0, 0B |           Error |                    N/A |                     N/A |
| Valid          |                                   1-999 |              499 |           Valid |                 1, 999 | 0, 1, 2, 998, 999, 1000 |
| Valid          |                             1-3 numbers |               22 |           Valid | length = 1, length = 3 |    "", 2, 22, 221, 3234 |
| Valid          | 1-3 numbers + 1 uppercase letter at end |    2B, 22B, 221B |           Valid |                    N/A |                     N/A |

#### List of test cases:

- Negative:
  - Symbols: `&` `@` `+` `-` `" "` `""`
  - Length: `123` `1234` `12345` `3234`
  - Letters: `aBc` `221b` `221BB` `B221` `2B21`
  - invalid numbers: `0` `0B` `1000`
- Positive:
  - Numbers: `1` `2` `22` `221` `499` `998` `999`
  - Numbers + Letter: `2B` `22B` `221B`

---

#### The Floor ('st' or from 1 to 99')

| Partition type |              Partitions | Test case values | Expected output |              Boundary values |          Test case values |
| -------------- | ----------------------: | ---------------: | --------------: | ---------------------------: | ------------------------: |
| Invalid        |                 symbols |  " ", &, @, -, + |           Error |                          N/A |                       N/A |
| Invalid        |  length = 3 to Infinite |            12345 |           Error | length = 3, numbers + string | 12, 123, 1234, s, st, sst |
| Invalid        | length = -Infinite to 1 |                1 |           Error |                   length = 1 |                 "", 1, 12 |
| Invalid        |        letters not "st" |       ab, aB, ST |           Error |                          N/A |                       N/A |
| Invalid        |          "st" + numbers |     st 33, 33 st |           Error |                          N/A |                       N/A |
| Invalid        |              number = 0 |                0 |           Error |                          N/A |                       N/A |
| Valid          |                    1-99 |               49 |           Valid |                        1, 99 |      0, 1, 2, 98, 99, 100 |
| Valid          |                    "st" |               st |           Valid |                          N/A |                       N/A |

#### List of test cases:

- Negative:
  - Symbols: `&` `@` `+` `-` `" "` `""`
  - Length: `12` `123` `1234` `12345` `s` `sst`
  - Letters: `ab` `aB` `ST` `st 33` `33 st`
  - invalid numbers: `0` `100`
- Positive:
  - Numbers: `1` `2` `49` `98` `99`
  - Letters: `st`

---

#### The Door ('th', 'tv', 'mf', a number from 1 to 50, or a lowercase letter optionally followed by a dash, then followed by one to three numeric digits (e.g., c3, d-144))

| Partition type |                                                    Partitions |   Test case values | Expected output | Boundary values |                                 Test case values |
| -------------- | ------------------------------------------------------------: | -----------------: | --------------: | --------------: | -----------------------------------------------: |
| Invalid        |                                                       symbols |       " ", &, @, + |           Error |             N/A |                                              N/A |
| Invalid        |                           alphabetical length = 3 to Infinite |                tvh |           Error |      length = 3 |                                       t, tv, tvh |
| Invalid        |                              numerical length = 3 to Infinite |                123 |           Error |      length = 3 |                                    12, 123, 1234 |
| Invalid        |                                                  only letters |                aBc |           Error |             N/A |                                              N/A |
| Invalid        |                                         only lowercase letter |               221b |           Error |             N/A |                                              N/A |
| Invalid        |                                          more than one letter |              221BB |           Error |             N/A |                                              N/A |
| Invalid        |                                      letter in wrong position | 1-a, z-99, 99a, 1z |           Error |             N/A |                                              N/A |
| Invalid        |                                        dash in wrong position |         -k50, k50- |           Error |             N/A |                                              N/A |
| Invalid        |                                                    number = 0 |                  0 |           Error |             N/A |                                              N/A |
| Valid          |                                              "th", "tv", "mf" |         th, tv, mf |           Valid |             N/A |                                              N/A |
| Valid          |                                                          1-50 |                 25 |           Valid |           1, 50 |                              0, 1, 2, 49, 50, 51 |
| Valid          | letter-dash-number --> letter = a-z, dash = -, number = 1-999 |               k-50 |           Valid |   a-z, -, 1-999 | a-0, a-1, b-99, y-998, z-999, a-1000, A-1, Z-999 |
| Valid          |                letter-number --> letter = a-z, number = 1-999 |                k50 |           Valid |      a-z, 1-999 |         a0, a1, b99, y998, z999, a1000, A1, Z999 |

#### List of test cases:

- Negative:
  - Symbols: `&` `@` `+` `-` `" "` `""`
  - Length: `123` `1234` `t` `tvh`
  - Letters: `TH` `TV` `MF` `aa` `zz` `1-a` `99-z` `99a` `1z`
  - Dash placement: `-k50` `k50-`
  - invalid numbers: `0`
  - invalid lowercase letter-dash-number: `a-0` `a-1000` `A-1` `Z-999`
  - invalid lowercase letter-number: `a0` `a1000` `A1` `Z999`
- Positive:
  - Numbers: `1` `2` `25` `49` `50`
  - Letters: `th` `tv` `mf`
  - lowercase letter-dash-number: `k-50` `a-1` `b-99` `y-998` `z-999`
  - lowercase letter + number: `k50` `a1` `b99` `y998` `z999`

---

#### The Postal Code and Town (from addresses.sql)

| Partition type |                Partitions |        Test case values | Expected output | Boundary values | Test case values |
| -------------- | ------------------------: | ----------------------: | --------------: | --------------: | ---------------: |
| Invalid        |                   symbols |       " ", &, @, +, 0-9 |           Error |             N/A |              N/A |
| Invalid        | Town ID != Postal code ID |   'Køge' id = '4632' id |           Error |             N/A |              N/A |
| Valid          |  Town ID = Postal code ID | 'Odense' id = '5000' id |           Valid |             N/A |              N/A |

#### List of test cases:

- Negative:
  - Symbols: `&` `@` `+` `-` `" "` `""` `0-9`
  - Wrong Address ID Match: `Town: Køge = Postal code: 4632`
- Positive:
  - Address ID Match: `Town: Odense = Postal code: 5000`

---

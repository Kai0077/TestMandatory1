# Black Box Test Schemas

## Partitions and 3-value boundaries analysis

### PhoneNumberHandler:
___
#### The 8 Digit Rule

Approach 1:

|Partition type|Partitions|Test case values|Expected output|Boundary values|Test case values|
|-|--:|--:|--:|--:|--:|
|Invalid|"", " "|"", " "|Error|N/A|N/A|
|Invalid|length = 1-7|12345|Error|length = 1, length = 7|"", 1, 12, 123456, 1234567, 12345678|
|Invalid|length = 9, Infinity|123456789012345|Error|length = 9|12345678, 123456789, 1234567890|
|Valid|length = 8|12345678|Valid|length = 8|1234567, 12345678, 123456789|


#### List of test cases:

`""`, `" "` `1` `12` `123456` `1234567` `12345678` `123456789` `1234567890` `123456789012345` 


Approach 2:

|Partition type|Partitions|Test case values|Expected output|Boundary values|Test case values|
|-|--:|--:|--:|--:|--:|
|Invalid|not digits|" ", &, `@` -, +, a-z, A-Z, æ, Æ, ø, Ø, å, Å|Error|N/A|N/A|
|Invalid|lenght = 0|0|Error|0|0, 1|
|Invalid|length = 1 - 7|5|Error|1, 7|0, 1, 2, 6, 7, 8|
|Invalid|length = 9 - Infinity|15|Error|9|8, 9, 10|
|Valid|length = 8|8|Valid|8|7, 8, 9|

#### List of test cases:

`&` `@` `+` `-` `" "` `""` `0` `1` `2` `6` `7` `8` `9` `10` `a` `z` `æ` `ø` `å`
___

#### Prefix validity

|Partition type|Partitions|Test case values|Expected output|Boundary values|Test case values|
|-|--:|--:|--:|--:|--:|
|Valid|2|2|Valid Single Digit|2|1, 2, 3|
|Valid|30, 31, 40, 41, 42, 50, 51, 52, 53, 60, 61, 71, 81, 91, 92, 93|51|Valid Double Digit|30, 93|29, 30, 31, 92, 93, 94|
|Valid|342, 344-349, 356-357, 359, 362, 365-366, 389, 398, 431, 441, 462, 466, 468, 472, 474, 476, 478, 485-486, 488-489, 493-496, 498-499, 542-543, 545, 551-552, 556, 571-574, 577, 579, 584, 586-587, 589, 597-598, 627, 629, 641, 649, 658, 662-665, 667, 692-694, 697, 771-772, 782-783, 785-786, 788-789, 826-827, 829|629|Valid Triple Digit|342, 829|341, 342, 343, 828, 829, 830|
|Valid|lenght == 1-3|51|Valid Prefix & Length|length == 1 or 2 or 3|"", 2, 51, 556, 1234|
|Invalid|1, 3-9|5|Error|1, 3, 9|0, 1, 2, 3, 4, 8, 9, 10|
|Invalid|62-70|65|Error|62, 70|61, 62, 63, 69, 70, 71|
|Invalid|546-550|548|Error|549, 550|545, 546, 547, 549, 550, 551|



#### List of test cases:

`""`, `0` `1` `2` `3` `4` `5` `8` `9` `10` `29` `30` `31` `51` `61` `62` `63` `65` `69` `70` `71` `92` `93` `94` `341` `342` `343` `545` `546` `547` `548` `549` `550` `551` `556` `828` `829` `830` `1234` 
___


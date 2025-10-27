# Black Box Test Schemas

## Partitions and 3-value boundaries analysis

### Person Handler:

---

#### The Postal Code and Town (from addresses.sql)

| Partition type |                            Partitions |          Test case values | Expected output | Boundary values | Test case values |
| -------------- | ------------------------------------: | ------------------------: | --------------: | --------------: | ---------------: |
| Invalid        |         first Name ID != Last Name ID |    'Anne' + 'Frederiksen' |           Error |             N/A |              N/A |
| Invalid        | First + Last Name ID != Gender --> ID |   'Anne Poulsen' + 'male' |           Error |             N/A |              N/A |
| Valid          |  First + Last Name ID = Gender --> ID | 'Anne Poulsen' + 'female' |           Valid |             N/A |              N/A |
| Valid          |  First + Last Name ID = Gender --> ID |   'Poul Poulsen' + 'male' |           Valid |             N/A |              N/A |

#### List of test cases:

- Negative:
  - Wrong ID between Firstname and Lastname: `Anne Frederiksen`
  - Wrong Gender for Person: `Anne Poulsen, male`
- Positive:
  - Name match for ID: `Anne Poulsen` `Poul Poulsen`
  - Name and Gender match: `Anne poulsen, female` `Poul Poulsen, male`
  ***

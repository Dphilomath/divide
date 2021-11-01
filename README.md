# divide

API for Divide app


**/users**
| Routes                         | Action                                 | Body                                          |
| -------------------------------|---------------------------------------| -------------------------------------------------------------|
| /newUser                 | Add a new user to users collection     | {"name":"daniyal", "phone":9988774466, "upi_id":"daniyal@okaxis"} |
| /details/:user_id        | Fetch user details                     |  {"user_id":"6shdjajjjaanfejdksfc"}  |
| /addFriend/:user_id      | Add a friend to user with user_id      |  {"friend_id":"6shdjajjjaanfejdksfc"} |

**/bills**
| Routes                         | Action                                 | Body                                          |
| -------------------------------|---------------------------------------| -------------------------------------------------------------|
| /                 | List all bills     |  Not needed  |
| /details/:bill_id        | Fetch bill details with bill_id                    |  Not needed   |
| /:user_id      | Fetch all the bills associated with the user      | Not needed  |
| /addBill       | Add a bill                  | {"user_id":"dddaadwedsx23ssd324", "bill_name":"shimla trip", "amount":10000, "equalSharing":1}   |

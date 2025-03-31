# Lesson 05 - Form Challenge

## 🧠 Objective
Use everything you've learned so far to build your own user registration form — from scratch. This time, you're on your own (mostly).

---

## 📋 Your Task
Create a working form that allows you to:
- Input a new user's name, email, password, and role
- Submit that data to the API endpoint using JavaScript
- Handle success and error messages properly

You’ll be using:
```
POST https://mx.velodata.org/api/v2/teach/users
```

---

## 🧩 Form Fields Required
| Field     | Type     | Validation                                  |
|-----------|----------|----------------------------------------------|
| Name      | text     | Required                                     |
| Email     | email    | Required                                     |
| Password  | password | Required (min 8 characters, at least one number) |
| Role      | select   | One of: Admin, Creator, Member, Spy          |

> 💡 Hint: Use the Bootstrap documentation if you need help building the form layout.

---

## 🔧 How It Should Work
1. Students write their own `<form>` inside the `#form-area` div in `index.html`
2. Add an event listener to the form in `script.js`
3. Build the JSON payload using the same structure from Lesson 03
4. Send the data using `fetch()` with `POST`
5. Display a Bootstrap alert with the result

---

## 🛠 Helpful Info
Use this variable at the top of your `script.js` file:
```js
const BASE_API_URL = 'https://mx.velodata.org/api/v2';
```

The `role_name` must match the `role_id`:
```js
const roles = {
  1: "Admin",
  2: "Creator",
  3: "Member",
  4: "Spy"
};
```

Use this when building the payload:
```js
{
  data: {
    attributes: {
      name: "...",
      email: "...",
      password: "...",
      role_name: "...",
      vmd_user_email: "trainer@example.com",
      vmd_user_name: "Trainer"
    },
    relationships: {
      roles: {
        data: [
          { id: ..., type: "roles" }
        ]
      }
    }
  }
}
```

---

## 🌟 Bonus Challenges
- Reset the form after submission
- Disable the button while submitting
- Add client-side validation before sending

---

Once your form is working and a new user is successfully created, congrats — you've mastered API POST requests! 💪
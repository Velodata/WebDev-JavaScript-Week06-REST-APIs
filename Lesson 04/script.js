// Lesson 04 - Form Challenge (Full Version for Editing)

const BASE_API_URL = 'https://mx.velodata.org/api/v2';

const roles = {
  1: "Admin",
  2: "Creator",
  3: "Member",
  4: "Spy"
};

const formArea = document.getElementById('form-area');
const responseMessage = document.getElementById('response-message');

// Inject a form into the page
formArea.innerHTML = `
  <form id="create-user-form" class="row g-3">
    <div class="col-12">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" required>
    </div>

    <div class="col-12">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" required>
    </div>

    <div class="col-12">
      <label for="password" class="form-label">Password <small class="text-muted">(min 8 characters, at least one number)</small></label>
      <input type="password" class="form-control" id="password" required>
    </div>

    <div class="col-12">
      <label for="role_id" class="form-label">Role</label>
      <select class="form-select" id="role_id" required>
        <option value="">Choose a role</option>
        <option value="1">Admin</option>
        <option value="2">Creator</option>
        <option value="3">Member</option>
        <option value="4">Spy</option>
      </select>
    </div>

    <div class="col-12">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
`;

const form = document.getElementById('create-user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roleInput = document.getElementById('role_id');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const password = passwordInput.value;
  const passwordValid = password.length >= 8 && /\d/.test(password);
  if (!passwordValid) {
    responseMessage.innerHTML = `<div class="alert alert-warning">Password must be at least 8 characters long and include at least one number.</div>`;
    return;
  }

  const roleId = roleInput.value;
  const roleName = roles[roleId] || "Unknown";

  const userData = {
    data: {
      attributes: {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: password,
        role_name: roleName,
        vmd_user_email: "trainer@example.com",
        vmd_user_name: "Trainer"
      },
      relationships: {
        roles: {
          data: [
            { id: roleId, type: "roles" }
          ]
        }
      }
    }
  };

  try {
    const response = await fetch(`${BASE_API_URL}/teach/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) throw new Error(`Status ${response.status}: ${response.statusText}`);

    const result = await response.json();
    responseMessage.innerHTML = `<div class="alert alert-success">User created successfully with ID: ${result.data.id}</div>`;
    form.reset();
  } catch (error) {
    responseMessage.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
  }
});
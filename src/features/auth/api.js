const api_url = "http://localhost:8888";

export async function registerUser(useData) {
  const response = await fetch(`${api_url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(useData),
  })
  if (!response.ok) {
    throw new Error("Error");
  }
  return response.json();
}

export async function loginUser(useData) {
  const response = await fetch(`${api_url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(useData),
  })
  if (!response.ok) {
    throw new Error("Error");
  }
}

class RequestObject {
  static async resEdit(route, body) {
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  static async deleteUser(id) {
    const response = await fetch(`/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.reload(true);
    const data = await response.json();
    return data;
  }
}

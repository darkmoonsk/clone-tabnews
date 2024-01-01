test("Get to /api/v1/status should return 200", async () =>{
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdateAt);

  expect(responseBody.database).toBeDefined();
  expect(responseBody.database.version).toBe("16.0");
  expect(responseBody.database.max_connections).toEqual(100);
  expect(responseBody.database.opened_connections).toBe(1);

});
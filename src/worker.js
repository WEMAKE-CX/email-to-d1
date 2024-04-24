export default {
  async email(message, env, ctx) {
    // Connect to D1 database
    const db = env.DB

    // Extract data from the message
    const email = message.from
    const subject = message.subject
    const body = message.body

    // Prepare an SQL query to insert the data into the database
    const query = `INSERT INTO emails (email, subject, body) VALUES (?, ?, ?)`

    // Execute the query
    await db.prepare(query).bind([email, subject, body]).run()
  }
}

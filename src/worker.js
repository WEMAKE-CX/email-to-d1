export default {
  async email(message, env, ctx) {
    // Connect to D1 database
    const db = env.DB

    // Extract data from the message
    const email =
      typeof message.from === 'string'
        ? message.from
        : message.from && typeof message.from.email === 'string'
        ? message.from.email
        : undefined
    const subject = message.subject
    const body = message.body

    // Check if email, subject, and body are defined and are of type string
    if (
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof body !== 'string'
    ) {
      console.error(
        'Invalid data type. Email, subject, and body must be of type string.',
        { email, subject, body }
      )
      throw new Error(
        'Invalid data type. Email, subject, and body must be of type string.'
      )
    }

    // Prepare an SQL query to insert the data into the database
    const query = `INSERT INTO emails (email, subject, body) VALUES (?, ?, ?)`

    // Bind email, subject, and body to the query as strings
    await db.prepare(query).bind([email, subject, body]).run()
  }
}


const requestHandler = (req, res)=>{
  console.log('Request made')

  const url = req.url
  const method = req.method
  
  if(url==='/'){
    console.log('Home page loaded')

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Task 01</title></head>')
    res.write('<body>')
    res.write('<p>Welcome to Task 01</p>')

    res.write('<body><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Send</button</form></body>')

    res.write('</body>')
    res.write('</html>')
    return res.end()
  }
  if(url==='/users'){
    console.log('Users page loaded')

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Task 01 - Users</title></head>')
    res.write('<body>')
    res.write('<ul><li>User 1</li><li>User 2</li></ul>')
    res.write('</body>')
    res.write('</html>')
    return res.end()
  }

  if (url==='/create-user' && method==='POST'){
    const body = []

    req.on('data', (chunk)=>{
      body.push(chunk)
    })

    req.on('end', ()=>{
      const parsedBody = Buffer.concat(body).toString()
      const user = parsedBody.split('=')[1]
      console.log(user)
    })

    res.statusCode = 302
    res.setHeader('Location', '/')
    return res.end()

  }

  //res.setHeader('Content-Type', 'text/html')

}

module.exports = {
  handler: requestHandler,
}
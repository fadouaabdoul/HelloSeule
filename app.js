import "/index.html"
import "node_modules/Seule" 

const express = require('express')

const el = {
     el: 'section',
      data: {
          message: 'Hello Seule'
      },

      
    const app = express(),  
          port = 3000;

        app.get('/', (req, res) => {
             res.send('Hello World!')
        }),

        app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
        })
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const memberlistRoutes = require('./routes/memberlist.routes');
const userRoutes = require('./routes/user.routes');
const roletypeRoutes = require('./routes/roletype.routes');
const subtaskRoutes = require('./routes/subtask.routes');
const taskRoutes = require('./routes/task.routes');
const teamRoutes = require('./routes/team.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to db
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

// routes
memberlistRoutes(app);
userRoutes(app);
roletypeRoutes(app);
subtaskRoutes(app);
taskRoutes(app);
teamRoutes(app);

// server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


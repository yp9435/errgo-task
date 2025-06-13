import express, { Request, Response } from 'express';
import cors from 'cors';
import { IProject, ProjectSchema } from './models/project.interface'; // zod schemaaa
import { v4 as uuid } from 'uuid';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

// found 2 TODOS here, completed method for project creation and retrieval, used zod for validation (BONUS)

const app = express();
const PORT = 3000;
// List of projects
const projects: IProject[] = [];
// Chat
const chatHistory: string[] = [];

// Setup cors and express.json()
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.send(JSON.stringify(chatHistory));

  ws.on('message', (message: string) => {
    const parsedMessage = message.toString();
    console.log('received: %s', parsedMessage);
    chatHistory.push(parsedMessage);
    
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([parsedMessage]));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (_req, res) => {
  res.send('Errgo Backend Interview Module Loaded Successfully!');
});

app.post('/projects', (req: Request, res: Response): void => {
  /**
   * TODO: Complete the method for creating a new project
   * The response should contain an object of type IProject
   * 
   * Hint: Utilize the `projects` to store the newly generated of project
   * Hint: Utilize the `uuid` npm package to generate the unique ids for the project
   */

  const validation = ProjectSchema.safeParse({
    id: "temp", 
    name: req.body.project?.name,
    description: req.body.project?.description,
  });

  if (!validation.success) {
    res.status(400).json({ errors: validation.error.errors });
    return;
  }

  const { name, description } = validation.data;
  const newProject: IProject = {
    id: uuid(),
    name,
    description
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

app.post('/chat', (req: Request, res: Response) => {
  /**
   * Example endpoint for posting a chat message (if needed)
   * This is just a placeholder and can be adjusted as per requirements.
   */

  const { message } = req.body;
  if (!message) {
    res.status(400).json({ message: 'Message is required' });
    return;
  }
  chatHistory.push(message);
  res.status(201).json({ message: 'Message added' });
});

app.get('/projects', (req: Request, res: Response) => {
  /**
   * TODO: Complete the method for returning the current list of projects
   * The responese should contain a list of IProject
   * 
   * Hint: Utilize the `projects` to retrieve the list of projects
   */

  res.status(200).json(projects);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

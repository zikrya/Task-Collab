import { Server } from "socket.io";
import { createServer } from "http";
import { io as Client, Socket } from "socket.io-client";

describe("WebSocket Server", () => {
  let ioServer: Server;
  let httpServer: any;
  let clientSocket: Socket;

  beforeAll((done) => {
    httpServer = createServer();
    ioServer = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = Client(`http://localhost:${port}`);
      clientSocket.on("connect", done);
    });

    ioServer.on("connection", (socket) => {
      socket.on("taskAdded", (task) => {
        ioServer.emit("taskAdded", task);
      });

      socket.on("taskCompleted", (id) => {
        ioServer.emit("taskCompleted", id);
      });

      socket.on("taskDeleted", (id) => {
        ioServer.emit("taskDeleted", id);
      });
    });
  });

  afterAll(() => {
    ioServer.close();
    clientSocket.close();
  });

  test("should broadcast taskAdded to all clients", (done) => {
    const task = { id: "1", text: "Test Task", completed: false, user: "TestUser" };

    clientSocket.on("taskAdded", (data) => {
      expect(data).toEqual(task);
      done();
    });

    clientSocket.emit("taskAdded", task);
  });

  test("should broadcast taskCompleted to all clients", (done) => {
    const taskId = "1";

    clientSocket.on("taskCompleted", (id) => {
      expect(id).toBe(taskId);
      done();
    });

    clientSocket.emit("taskCompleted", taskId);
  });

  test("should broadcast taskDeleted to all clients", (done) => {
    const taskId = "1";

    clientSocket.on("taskDeleted", (id) => {
      expect(id).toBe(taskId);
      done();
    });

    clientSocket.emit("taskDeleted", taskId);
  });
});

import "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.2/socket.io.min.js";

export const socket = io("http://localhost:3004", {
  transports: ["websocket"],
});

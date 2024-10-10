const worldLog = () => {
  console.log("world");
};

RegisterCommand("hello", worldLog, false);

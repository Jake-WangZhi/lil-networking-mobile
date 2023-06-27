self.addEventListener("push", function (event) {
  const { title, body } = event.data ? event.data.json() : "no payload";

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
    })
  );
});

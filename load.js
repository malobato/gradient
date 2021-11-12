if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("serviceworker.js")
        .then(
            (reg) => console.log("Sucessfully register")
        )
        .catch(
            (error) => console.error("ServiceWorker Error")
        );
}
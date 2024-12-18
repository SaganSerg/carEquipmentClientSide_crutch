const cluster = require('cluster')


function startWorker() {
    const worker = cluster.fork()
    console.log(`КЛАСТЕР: Исполнитель ${worker.id} запущен`)
}

if (cluster.isMaster) {
    require('os').cpus().forEach(startWorker)
    cluster.on('disconnect', worker => console.log(
        `CLUSTER: Worker ${worker.id} disconnected from the cluster.`
    )
    )
    cluster.on('exit', (worker, code, signal) => {
        console.log(
            `CLUSTER: Worker ${worker.id} died with exit ` +
            `code ${code} (${signal})`
        )
        startWorker()
    }
    )
} else {
    const port = process.env.PORT || 3000
    require('./app.js')(port)
}

// forever start app_cluster.js
// forever restart app_cluster.js
// forever stop app_cluster.js
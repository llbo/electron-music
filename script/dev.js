const path = require('path')
const os = require('os')
const fs = require('fs')
const { spawn } = require('child_process')
process.env.RES_DIR = path.join(process.cwd(), 'resource/release')

const dev = {
  server: null,
  serverPort: 800,
  electronProcess: null,
  async createServer() {
    const vite = require('vite')
    const vue = require('@vitejs/plugin-vue')
    const options = {
      configFile: false,
      root: process.cwd(),
      server: {
        port: this.serverPort
      },
      plugins: [vue()]
    }
    this.server = await vite.createServer(options)
    await this.server.listen()
  },
  buildProcessEntry() {
    const esbuild = require('esbuild')
    const entryFilePath = path.join(process.cwd(), 'src/main/Entry.ts')
    const outfile = path.join(process.cwd(), 'release/bundled/entry.js')
    esbuild.buildSync({
      entryPoints: [entryFilePath],
      outfile,
      minify: true,
      bundle: true,
      platform: 'node',
      sourcemap: true,
      external: ['electron']
    })
    const envScript = `process.env.ENV_NOW = 'dev'; process.env.WEB_PORT = ${this.serverPort}; process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;`
    const js = `${envScript}${os.EOL}${fs.readFileSync(outfile)}`
    fs.writeFileSync(outfile, js)
  },
  createElectronProcess() {
    const electronPath = require('electron').toString()
    const entryJsPath = './release/bundled/entry.js'
    this.electronProcess = spawn(electronPath, [entryJsPath], {
      cwd: process.cwd()
    })
    this.electronProcess.on('close', () => {
      this.server.close()
      process.exit()
    })
    this.electronProcess.stdout.on('data', (data) => {
      data = data.toString()
      console.log(data)
    })
  },
  async start() {
    await this.createServer()
    await this.buildProcessEntry()
    await this.createElectronProcess()
  }
}
dev.start()

const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (request, file, next) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowed.includes(file.mimetype)) {
      next(null, true)
    } else {
      next({ message: 'Arquivo não suportado' }, false)
    }
  }
}

exports.upload = multer(multerOptions).single('photo')

exports.resize = async (request, response, next) => {
  if (!request.file) {
    next()
    return
  }

  const ext = request.file.mimetype.split('/')[1]
  const filename = `${uuid.v4()}.${ext}`

  request.body.photo = filename

  const photo = await jimp.read(request.file.buffer)
  await photo.resize(800, jimp.AUTO)
  await photo.write(`./public/media/${filename}`)
  next()
}

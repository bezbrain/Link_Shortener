const NotFoundError = require('../errors/not-found')
const Link = require('../models/Link')
const { StatusCodes } = require('http-status-codes')

const createLink = async (req, res) => {
  const link = await Link.create(req.body)
  res.status(StatusCodes.CREATED).json({ link })
}

const getLink = async (req, res) => {
  const link = await Link.findOne({ shortLink: req.params.shortLink })
  if (!link) {
    throw new NotFoundError('link not found')
  }
  // res.status(StatusCodes.OK).json({ msg: link.originalLink })
  res.status(StatusCodes.OK).redirect(link.originalLink)
}

const getAllLinks = async (req, res) => {
  const links = await Link.find({})
  res.status(StatusCodes.OK).json({ links })
}

module.exports = {
  createLink,
  getLink,
  getAllLinks,
}

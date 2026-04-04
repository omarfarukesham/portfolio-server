import { EbookModel, IEbook } from './ebook.model'

const getAllEbooks = async () => {
  return EbookModel.find({ isActive: true }).sort({ createdAt: -1 })
}

const getEbookBySlug = async (slug: string) => {
  return EbookModel.findOne({ slug, isActive: true })
}

const createEbook = async (data: Partial<IEbook>) => {
  return EbookModel.create(data)
}

const updateEbook = async (slug: string, data: Partial<IEbook>) => {
  return EbookModel.findOneAndUpdate({ slug }, data, { new: true, runValidators: true })
}

const deleteEbook = async (slug: string) => {
  return EbookModel.findOneAndUpdate({ slug }, { isActive: false }, { new: true })
}

export const EbookService = { getAllEbooks, getEbookBySlug, createEbook, updateEbook, deleteEbook }
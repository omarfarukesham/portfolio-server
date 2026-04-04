import { FireProductModel } from './fireProduct.model'

const getAll = async () => {
  return FireProductModel.find({ status: 'active' }).sort({ createdAt: -1 })
}

const getBySlug = async (slug: string) => {
  return FireProductModel.findOne({ slug, status: 'active' })
}

export const FireProductService = {
  getAll,
  getBySlug,
}

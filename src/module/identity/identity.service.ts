import { UserIdentityModel } from './identity.model'

const findOrCreate = async (identifier: { email?: string; phone?: string }) => {
  const email = identifier.email?.toLowerCase().trim()
  const phone = identifier.phone?.trim()

  if (!email && !phone) {
    throw new Error('Email or phone is required')
  }

  // Build $or query to find by either email or phone
  const orConditions: Record<string, string>[] = []
  if (email) orConditions.push({ email })
  if (phone) orConditions.push({ phone })

  let identity = await UserIdentityModel.findOne({ $or: orConditions })

  if (!identity) {
    // Create new identity
    const data: Record<string, string> = {}
    if (email) data.email = email
    if (phone) data.phone = phone
    identity = await UserIdentityModel.create(data)
  } else {
    // Update existing identity if new fields are provided
    let needsUpdate = false
    if (email && !identity.email) { identity.email = email; needsUpdate = true }
    if (phone && !identity.phone) { identity.phone = phone; needsUpdate = true }
    if (needsUpdate) await identity.save()
  }

  return identity
}

const findByIdentifier = async (identifier: string) => {
  return UserIdentityModel.findOne({
    $or: [
      { email: identifier.toLowerCase().trim() },
      { phone: identifier.trim() },
    ],
  })
}

export const IdentityService = { findOrCreate, findByIdentifier }
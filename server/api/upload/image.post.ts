import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const formData = await readFormData(event)
    const file = formData.get('file') as File | null

    if (!file) throw createError({ statusCode: 400, message: 'No file provided' })

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
        throw createError({ statusCode: 400, message: 'Only JPEG, PNG, WebP, and GIF images are allowed' })
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
        throw createError({ statusCode: 400, message: 'File size must be under 5MB' })
    }

    const config = useRuntimeConfig()
    const supabaseUrl = config.supabaseUrl
    const supabaseKey = config.supabaseServiceKey

    if (!supabaseUrl || !supabaseKey) {
        throw createError({ statusCode: 500, message: 'Supabase storage not configured' })
    }

    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadUrl = `${supabaseUrl}/storage/v1/object/recipe-images/${fileName}`

    const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': file.type,
            'x-upsert': 'true',
        },
        body: buffer,
    })

    if (!response.ok) {
        const err = await response.text()
        throw createError({ statusCode: 500, message: `Upload failed: ${err}` })
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/recipe-images/${fileName}`
    return { url: publicUrl }
})

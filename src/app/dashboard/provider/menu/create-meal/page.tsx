import React from 'react'
import { CreateMealForm } from './create-meal-form'

export default function CreateMealPage() {
  return (
    <div>
        <CreateMealForm
            submitLabel='Create Meal'
            initialValues={{
                    name: "",
                    details: "",
                    price: 1,
                    categoryId: "",
                    image_url: "",
                    isAvailable: true,
                }}
        />

    </div>
  )
}

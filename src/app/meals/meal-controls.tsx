"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { useState } from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function MealsControls({ query, categories }) {
    const [searchParam, setSearchParam] = useState(query.searchParam);
    const [categoryId, setCategoryId] = useState(query.categoryId);
    const router = useRouter();

    const handleApply = () => {
        const params = new URLSearchParams();

        if (searchParam) {
            params.set("searchParam", searchParam);
        }

        if (categoryId) {
            params.set("categoryId", categoryId);
        }

        router.push(`/meals?${params.toString()}`);
    }

    const handleClear = () => {
        setSearchParam("");
        setCategoryId("");
        router.push("/meals");
    }


    return (
        <div className="mt-5 mb-5">

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                    className="sm:flex-1"
                    placeholder="Search here..."
                    value={searchParam}
                    onChange={e => setSearchParam(e.target.value)}
                />

                <Select onValueChange={setCategoryId}>
                    <SelectTrigger className="w-full sm:w-56">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>


                            {
                                categories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))
                            }

                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="flex gap-2 sm:shrink-0">
                    <Button onClick={handleApply} className="w-full sm:w-auto">
                        Apply
                    </Button>
                    <Button variant="outline" onClick={handleClear} className="w-full sm:w-auto">
                        Clear
                    </Button>
                </div>
            </div>


        </div>
    )
}

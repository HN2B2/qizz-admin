import ky from "ky"
import { Exception } from "@/types/exception"
import { ListResponse } from "@/types/ListResponse"
import { Bank } from "@/types/bank"

export const instance = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    hooks: {
        beforeError: [
            async (error) => {
                const { response } = error

                if (response) {
                    const data: Exception = await response.json()
                    error.name = `(${data.status}) ${data.error}`
                    error.message = data.message
                }

                return error
            },
        ],
    },
})

export const getErrorStatusCode = (error: any) => {
    if (error) {
        return parseInt(error.name.split(" ")[0].replace("(", ""))
    } else {
        return 200
    }
}

// export const localInstance = ky.create({
//     prefixUrl: appUrl,
//     credentials: "include",
// })

export const getServerErrorNoti = (error: any) => {
    if (error) {
        return error.message
    } else {
        return "Something went wrong"
    }
}

export const convertDate = (date: string, outputPattern = "dd/mm/yyyy") => {
    // get date follow input pattern
    const datePattern = /(\d{4})-(\d{2})-(\d{2})/
    const [, year, month, day] = datePattern.exec(date) || []
    const dateObj = new Date(`${month}/${day}/${year}`)
    // get date follow output pattern
    const dayString = dateObj.getDate().toString().padStart(2, "0")
    const monthString = (dateObj.getMonth() + 1).toString().padStart(2, "0")
    const yearString = dateObj.getFullYear().toString()
    const dateMap: { [key: string]: string } = {
        dd: dayString,
        mm: monthString,
        yyyy: yearString,
    }
    return outputPattern.replace(/dd|mm|yyyy/g, (matched) => dateMap[matched])
}

export const removeEmpty = (obj: any) => {
    let newObj: any = {}
    Object.keys(obj).forEach((key) => {
        if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key])
        else if (obj[key] !== undefined) newObj[key] = obj[key]
    })
    return newObj
}

export const getChartData = (listData: ListResponse<Bank> | undefined) => {
    if (!listData) return []
    const { data } = listData
    const dataChart: { date: string; totalBank: number }[] = []
    data.forEach((item) => {
        const date = convertDate(item.createdAt, "dd/mm")
        const index = dataChart.findIndex((x) => x.date === date)
        if (index === -1) {
            dataChart.push({ date, totalBank: 1 })
        } else {
            dataChart[index].totalBank++
        }
    })
    return dataChart.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA.getTime() - dateB.getTime()
    })
}

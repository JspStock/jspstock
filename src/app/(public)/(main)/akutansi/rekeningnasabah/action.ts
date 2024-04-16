"use server"

import { Prisma } from "@prisma/client"
import prisma from "../../../../../../prisma/database"
import { cookies } from "next/headers"
import { SearchParams } from "./page"
import { extension } from "prisma-paginate"

export type GetSavingAccountsPayLoad = Prisma.SavingAccountsGetPayload<{
    select: {
        id: true,
        name: true
    }
}>
export const getSavingAccounts = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export type GetMutationPayload = Prisma.SavingAccountsGetPayload<{
    include: {
        sales: {
            select: {
                discount: true,
                shippingCost: true,
                createdAt: true,
                saleOrder: {
                    select: {
                        qty: true,
                        product: {
                            select: {
                                price: true
                            }
                        }
                    }
                }
            },
        },
        saleReturns: {
            select: {
                createdAt: true,
                saleReturnOrders: {
                    select: {
                        qty: true,
                        product: {
                            select: {
                                price: true
                            }
                        }
                    }
                }
            }
        },
        purchase: {
            select: {
                discount: true,
                shippingCost: true,
                createdAt: true,
                purchaseOrder: {
                    select: {
                        qty: true,
                        product: {
                            select: {
                                price: true
                            }
                        }
                    }
                }
            }
        },
        purchaseReturns: {
            select: {
                createdAt: true,
                purchaseReturnOrders: {
                    select: {
                        qty: true,
                        product: {
                            select: {
                                price: true
                            }
                        }
                    }
                }
            }
        },
        expenditures: {
            select: {
                createdAt: true,
                total: true
            }
        },
        sender: {
            select: {
                createdAt: true,
                total: true
            }
        },
        recipient: {
            select: {
                createdAt: true,
                total: true
            }
        },
    }
}>

export const getMutation = async (searchParams: SearchParams) => {
    const gte = () => {
        if (searchParams.date) {
            const from = searchParams.date.split("to")[0]
            const to = searchParams.date.split("to")[1]

            if (from != to) {
                const date = new Date(from)
                date.setDate(date.getDate() - 1)
                return date
            } else {
                return undefined
            }
        }

        return undefined
    }

    const lte = () => {
        if (searchParams.date) {
            const to = searchParams.date.split("to")[1]

            const date = new Date(to)
            return date
        }

        return undefined
    }

    return await prisma.savingAccounts.findUnique({
        where: {
            id: searchParams.account
        },
        include: {
            sales: {
                where: {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                    createdAt: {
                        lte: lte(),
                        gte: gte()
                    }
                },
                select: {
                    id: true,
                    discount: true,
                    shippingCost: true,
                    createdAt: true,
                    saleOrder: {
                        select: {
                            qty: true,
                            product: {
                                select: {
                                    price: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            saleReturns: {
                where: {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                    createdAt: {
                        lte: lte(),
                        gte: gte()
                    }
                },
                select: {
                    id: true,
                    createdAt: true,
                    saleReturnOrders: {
                        select: {
                            qty: true,
                            product: {
                                select: {
                                    price: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            purchase: {
                where: {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                    createdAt: {
                        lte: lte(),
                        gte: gte()
                    }
                },
                select: {
                    id: true,
                    discount: true,
                    shippingCost: true,
                    createdAt: true,
                    purchaseOrder: {
                        select: {
                            qty: true,
                            product: {
                                select: {
                                    price: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            purchaseReturns: {
                where: {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                    createdAt: {
                        lte: lte(),
                        gte: gte()
                    }
                },
                select: {
                    id: true,
                    createdAt: true,
                    purchaseReturnOrders: {
                        select: {
                            qty: true,
                            product: {
                                select: {
                                    price: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            expenditures: {
                where: {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                    createdAt: {
                        lte: lte(),
                        gte: gte()
                    }
                },
                select: {
                    id: true,
                    createdAt: true,
                    total: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            sender: {
                where: {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                    createdAt: {
                        lte: lte(),
                        gte: gte()
                    }
                },
                select: {
                    id: true,
                    createdAt: true,
                    total: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            recipient: {
                where: {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                    createdAt: {
                        lte: lte(),
                        gte: gte()
                    }
                },
                select: {
                    id: true,
                    createdAt: true,
                    total: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
        }
    })
}
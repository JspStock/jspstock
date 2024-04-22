"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../prisma/database"
import { SearchParams } from "./page"
import { gte, lte } from "@/utils/utils"

export const getData = async (searchParams: SearchParams) => await prisma.store.findUnique({
    where: {
        id: cookies().get('store')?.value,
    },
    select: {
        sales: {
            where: {
                createdAt: {
                    lte: lte(searchParams),
                    gte: gte(searchParams)
                }
            },
            select: {
                discount: true,
                shippingCost: true,
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
            }
        },
        saleReturns: {
            where: {
                createdAt: {
                    lte: lte(searchParams),
                    gte: gte(searchParams)
                }
            },
            select: {
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
        purchaseReturns: {
            where: {
                createdAt: {
                    lte: lte(searchParams),
                    gte: gte(searchParams)
                }
            },
            select: {
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
        purchase: {
            where: {
                createdAt: {
                    lte: lte(searchParams),
                    gte: gte(searchParams)
                }
            },
            select: {
                discount: true,
                shippingCost: true,
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
        expenditures: {
            where: {
                createdAt: {
                    lte: lte(searchParams),
                    gte: gte(searchParams)
                }
            },
            select: {
                total: true
            }
        }
    }
})
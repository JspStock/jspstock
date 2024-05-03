"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../prisma/database"
import { SearchParams } from "./page"
import { gte, lte } from "@/utils/utils"
import { Prisma } from "@prisma/client"

export type GetDataPayload = Prisma.StoreGetPayload<{
    select: {
        sales: {
            select: {
                discount: true,
                shippingCost: true,
                saleOrder: {
                    select: {
                        qty: true,
                        product: {
                            select: {
                                price: true,
                                cost: true
                            }
                        }
                    }
                },
                createdAt: true
            }
        },
        saleReturns: {
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
                },
                createdAt: true
            }
        },
        purchaseReturns: {
            select: {
                purchase: {
                    select: {
                        total: true
                    }
                },
                createdAt: true
            }
        },
        purchase: {
            select: {
                total: true,
                createdAt: true
            }
        },
        expenditures: {
            select: {
                total: true,
                createdAt: true
            }
        }
    }
}>

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
                                price: true,
                                cost: true
                            }
                        }
                    }
                },
                createdAt: true
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
                },
                createdAt: true
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
                purchase: {
                    select: {
                        total: true
                    }
                },
                createdAt: true
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
                total: true,
                createdAt: true
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
                total: true,
                createdAt: true
            }
        }
    }
})
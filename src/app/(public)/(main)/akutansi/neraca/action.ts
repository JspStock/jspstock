"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../../prisma/database"
import { cookies } from "next/headers"
import { SearchParams } from "./page"
import { Prisma } from "@prisma/client"

export type GetSavingAccounts = Prisma.SavingAccountsGetPayload<{
    select: {
        id: true,
        name: true,
        sales: {
            select: {
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
        purchase: {
            select: {
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
                total: true
            }
        },
        sender: {
            select: {
                total: true
            }
        },
        recipient: {
            select: {
                total: true
            }
        },
        startingBalance: true
    }
}>

export const getSavingAccounts = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountData = await extend.savingAccounts.count({
        where: {
            idStore: cookies().get('store')?.value
        },
    })

    return await extend.savingAccounts.paginate({
        where: {
            idStore: cookies().get('store')?.value,
            OR: [
                {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                },
                {
                    name: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                },
            ]
        },
        select: {
            id: true,
            name: true,
            sales: {
                select: {
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
            purchase: {
                select: {
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
                    total: true
                }
            },
            sender: {
                select: {
                    total: true
                }
            },
            recipient: {
                select: {
                    total: true
                }
            },
            startingBalance: true
        },
        orderBy: {
            createdAt: "desc",
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}
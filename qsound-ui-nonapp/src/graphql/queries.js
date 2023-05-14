export const getTokenBalanceByAddress = (walletAddress, tokenAddress) => {
    return (
        `
                    # Please verify the address ADDRESS_HERE ApeCoin
            query VitaliksApeCoinBalance {
                TokenBalances(
                    input: {
                    filter: {
                        owner: {_in: ["${walletAddress}"]},
                        tokenAddress: {_eq: "${tokenAddress}"}
                    },
                    blockchain: ethereum,
                    limit: 10
                    }
                ) {
                    TokenBalance {
                    tokenAddress
                    amount
                    formattedAmount
                    token {
                        name
                        symbol
                    }
                    owner {
                        addresses
                        socials {
                        profileName
                        userAssociatedAddresses
                        }
                    }
                    }
                }
            }
        `
    )
}
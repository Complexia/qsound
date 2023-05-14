export const getTokenBalanceByAddress = (walletAddress, tokenAddress) => {
    return (
        `
                   
            query geTokentBalanceByAddress {
                TokenBalances(
                    input: {
                    filter: {
                        owner: {_in: ["0x269a639D9A8c6c300250BcC4D561EA9d245A5690"]},
                        tokenAddress: {_eq: "0x8761b55aF5A703d5855F1865dB8fE4DD18E94c53"}
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
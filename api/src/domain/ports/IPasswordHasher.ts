export interface IPasswordHasher {
    compare ( password: string, hash: string ): Promise<boolean>
}

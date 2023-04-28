export interface Permission {

    setAcl(sessionId: string, resourceUrl: string): Promise<void>
}
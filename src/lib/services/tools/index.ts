import api, { apiLogger } from "@/lib/api";
import { KaiToolsInterface } from "./types";

export const tools = async () => {
    try {
        const response = await api.client.get<KaiToolsInterface[]>(api.endpoints.tools.list);
        return response;
    } catch (error) {
        apiLogger.error('GET', api.endpoints.tools.list, error as { response?: { status: number; data: unknown }; message: string; stack?: string });
        throw error;
    }
};
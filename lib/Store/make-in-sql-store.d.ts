/**
 * @file SQLite Store Management for Baileys
 * @license MIT
 *
 * Use and modify this code freely under the MIT license. If you use this in your projects, attribution would be appreciated.
 *
 * Author: Zaid (GitHub: hacxk)
 *
 * This module provides a SQLite-based storage solution for managing Baileys data, including message history,
 * contacts, groups, and connection state. It uses SQLite to persist data and LRU cache for efficient data
 * retrieval. It supports CRUD operations for managing messages, contacts, group metadata, and more.
 */
import { BaileysEventEmitter, ConnectionState, Contact, GroupMetadata, WAMessageKey } from "../Types";
import { proto } from "../../WAProto";
import makeWASocket from "../Socket";
import pino from "pino";
type WASocket = ReturnType<typeof makeWASocket>;
export interface makeInSQLiteStoreFunc {
    state: ConnectionState | null;
    bind: (ev: BaileysEventEmitter, sock: WASocket) => Promise<void>;
    getData: (key: string) => Promise<any>;
    setData: (key: string, data: any) => Promise<void>;
    loadMessages: (jid: string, count: number) => Promise<proto.IWebMessageInfo[]>;
    loadMessage: (jid: string, id: string) => Promise<proto.IWebMessageInfo | undefined>;
    loadAllGroupMetadata: () => Promise<GroupMetadata[]>;
    loadGroupMetadataByJid: (jid: string) => Promise<GroupMetadata | undefined>;
    customQuery: (query: string, params?: any[]) => Promise<any>;
    getAllContacts: () => Promise<Contact[]>;
    getGroupByJid: (jid: string) => Promise<GroupMetadata | undefined>;
    updateMessageStatus: (jid: string, id: string, status: "sent" | "delivered" | "read") => Promise<void>;
    removeAllData: () => Promise<void>;
    getMessageLabels: (messageId: string) => Promise<string[]>;
    mostRecentMessage: (jid: string) => Promise<proto.IWebMessageInfo>;
    fetchImageUrl: (jid: string, sock: WASocket | undefined) => Promise<string | null | undefined>;
    fetchGroupMetadata: (jid: string, sock: WASocket | undefined) => Promise<GroupMetadata>;
    fetchMessageReceipts: ({ remoteJid, id, }: WAMessageKey) => Promise<proto.IUserReceipt[] | null | undefined>;
    toJSON: () => any;
    fromJSON: (json: any) => void;
}
export declare function makeInSQLiteStore(instance_id: string, dbPath: string, logger?: pino.Logger): Promise<makeInSQLiteStoreFunc>;
export {};

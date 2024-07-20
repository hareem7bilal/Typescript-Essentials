let x: number = 5
let y: string
let z: boolean
let a: Date
let b: any
let m: string[]

m = "Hi" as any
b = "Hello"
b = 1234

interface Contact extends Address {
    id: number,
    name: ContactName,
    birthDate?: Date,
    status?: ContactStatus,
    clone?(name: string): Contact
}

interface Address {
    line1?: string;
    line2?: string;
    province?: string;
    region?: string;
    postalCode?: string;
}

enum ContactStatus {
    Active = "active", InActive="inactive", New = "new"
}

let primaryContact: Contact = {
    //birthDate: new Date("01-01-1980"),
    id: 12345,
    name: "Jamie Johnson",
    postalCode: "44200",
    status: ContactStatus.Active
}

type ContactName = string

function clone(source: Contact, func?: (source:Contact)=>Contact):Contact {
    return Object.apply({}, source);
}

const j: Contact = { id: 123, name: "Homer Simpson" };
const o = clone(j)

function clone2<T>(source: T, func?: (source:T)=>T):T {
    return Object.apply({}, source);
}

function clone3<T1,T2>(source: T1, func?: (source:T1)=>T2):T2 {
    return Object.apply({}, source);
}

interface UserContact {
    id: number,
    name: string,
    username: string
}

function clone4<T1,T2 extends T1>(source: T1, func?: (source:T1)=>T2):T2 {
    return Object.apply({}, source);
}

const dateRange = { startDate: Date.now(), endDate: Date.now() }
const dateRangeCopy = clone2(dateRange)
const dateRangeCopy2 = clone3<Object, Object>(dateRange)

const contactCopy = clone4<Contact, UserContact>(j)

interface UserContact2<TExternalId> {
    id: number
    name: string
    username: string
    externalId: TExternalId
    //loadExternalId(): Task<TExternalId>
}
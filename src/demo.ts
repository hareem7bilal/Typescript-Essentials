let a: Date
let b: any
let m: string[]

m = "Hi" as any
b = "Hello"
b = 1234

interface Contact extends Address {
    id: number,
    name: ContactName,
    birthDate?: ContactBirthDate,
    status?: ContactStatus,
    clone?(name: string): Contact
    address?: Address
}

interface Address {
    line1?: string;
    line2?: string;
    province?: string;
    region?: string;
    postalCode?: string;
}

// enum ContactStatus {
//     Active = "active", InActive="inactive", New = "new"
// }

type ContactStatus = "active" | "inactive" | "new"

let primaryContact: Contact = {
    //birthDate: new Date("01-01-1980"),
    id: 12345,
    name: "Jamie Johnson",
    postalCode: "44200",
    status: "active"
}

type ContactName = string
type ContactBirthDate = Date | String | Number

// interface AddressableContact extends Contact, Address {

// }

type AddressableContact = Contact & Address

function clone(source: Contact, func?: (source: Contact) => Contact): Contact {
    return Object.apply({}, source);
}

const j: Contact = { id: 123, name: "Homer Simpson" };
const o = clone(j)

function clone2<T>(source: T, func?: (source: T) => T): T {
    return Object.apply({}, source);
}

function clone3<T1, T2>(source: T1, func?: (source: T1) => T2): T2 {
    return Object.apply({}, source);
}

interface UserContact {
    id: number,
    name: string,
    username: string
}

function clone4<T1, T2 extends T1>(source: T1, func?: (source: T1) => T2): T2 {
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

function getBirthDate(contact: Contact) {
    if (typeof contact.birthDate === "number") {
        return new Date(contact.birthDate);
    }
    else if (typeof contact.birthDate === "string") {
        return Date.parse(contact.birthDate)
    }
    else {
        return contact.birthDate
    }
}

type ContactFields = keyof Contact

const field: ContactFields = "status"

function getValue<T, U extends keyof T>(source: T, propertyName: U) {
    return source[propertyName]
}

const value = getValue({ min: 1, max: 34 }, "max")

function toContact(nameOrContact: Contact): Contact {
    if (typeof nameOrContact === "object") {
        return {
            id: nameOrContact.id,
            name: nameOrContact.name,
            status: nameOrContact.status
        }
    }
    else {
        return {
            id: 0,
            name: nameOrContact,
            status: "active"
        }
    }
}

const myType = { min: 1, max: 200 }
function save(source: typeof myType){}

type Awesome = Contact['address']["postalCode"]

interface ContactEvent {
    contactId: Contact["id"];
}

interface ContactDeletedEvent extends ContactEvent { 
}

interface ContactStatusChangedEvent extends ContactEvent { 
    oldStatus: Contact["status"];
    newStatus: Contact["status"] ;
}

interface ContactEvents {
    deleted: ContactDeletedEvent;
    statusChanged: ContactStatusChangedEvent;
    // ... and so on
}

function handleEvent<T extends keyof ContactEvents>(
    eventName: T,
    handler: (evt: ContactEvents[T]) => void
) {
    if (eventName === "statusChanged") {
        handler({ contactId: 1, oldStatus: "active", newStatus: "inactive" })
    }
}

handleEvent("statusChanged", evt => evt)

////////////////////

let x: Record<string, string | number | boolean | Function> = { name: "Wruce Bayne" }
x.number = 1234
x.active = true
x.log = () => console.log("awesome!")

interface Query<TProp> {
    sort?: 'asc' | 'desc';
    matches(val:TProp): boolean;
}

// type ContactQuery = Omit<Partial<Record<keyof Contact, Query>>, "address" | "status">
// type ContactQuery = Partial<Pick<Record<keyof Contact, Query>, "id"| "name">>
// type RequiredContactQuery = Required<ContactQuery>

type ContactQuery = {
    [TProp in keyof Contact]?:Query<Contact[TProp]>
}

function searchContacts(contacts: Contact[], query: ContactQuery) {
    return contacts.filter(contact => {
        for (const property of Object.keys(contact) as (keyof Contact)[]) {
            // get the query object for this property
            const propertyQuery = query[property] as Query<Contact[keyof Contact]>;
            // check to see if it matches
            if (propertyQuery && propertyQuery.matches(contact[property])) {
                return true;
            }
        }

        return false;
    })
}

const filteredContacts = searchContacts(
    [/* contacts */],
    {
        id: { matches: (id) => id === 123 },
        name: { matches: (name) => name === "Carol Weaver" },
        //phoneNumber: { matches: (name) => name === "Carol Weaver" },
    }
);



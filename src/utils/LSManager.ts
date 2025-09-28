class DB{
	constructor(private readonly db: string,){}
	private tryParse(){
		try{
			if(!this.isClient()){return {}}
			const data = window.localStorage.getItem(this.db);
			return data ? JSON.parse(data) : {};
		}
		catch{
			return {}
		}
	}
	private saveValue(newDb: {[key: string]: unknown}){
		if (!this.isClient()) return {status: false, error: "Not Client"};
		try{
			window.localStorage.setItem(this.db, JSON.stringify(newDb));
			return {status: true};
		}
		catch(err){
			return {status: false, error: err};
		}
	}
	private isClient(){
		return typeof window !== 'undefined';
	}

	public find(field: string){
		const db = this.tryParse();
		return db[field]
	}
	public change(field: string, value: unknown){
		const db = this.tryParse();
		db[field] = value;
		return this.saveValue(db);
	}
	public delete(field: string){
		const db = this.tryParse();
		delete db[field];
		return this.saveValue(db)
	}
}
export class LSManager{
	static db(dbName: string){
		return new DB(dbName);
	}
}
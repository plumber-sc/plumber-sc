
import { prettyClrType, parseClrTypeName } from "../clrTypes";

describe("prettyClrType", () => {
    test("handles complex acceptance tests", () => {
        expect(prettyClrType("System.Collections.Generic.IEnumerable`1[[Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null]]"))
            .toBe("IEnumerable<Sitecore.Commerce.Plugin.Shops.Shop>")

        expect(prettyClrType("System.Collections.Generic.IDictionary`2[[System.String], [System.Int16]]"))
            .toBe("IDictionary<string, short>")

        expect(prettyClrType("System.Collections.Generic.IDictionary`2[[Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null], [Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null]]"))
            .toBe("IDictionary<Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops.Shop>")

        expect(prettyClrType("System.Collections.Generic.IDictionary`2[[System.Int32], [System.Collections.Generic.IDictionary`2[[Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null], [System.Tuple`2[[System.String], [Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null]]], [System.Collections.Generic.IDictionary`2[[Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null], [Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null]]]]"))
            .toBe("IDictionary<int, IDictionary<Sitecore.Commerce.Plugin.Shops.Shop, Tuple<string, Sitecore.Commerce.Plugin.Shops.Shop>>>")
    });

    test("original type is returned for types that throw errors", () => {
        expect(prettyClrType("Sys?tem.String"))
            .toBe("Sys?tem.String");
    });
});

describe("parseClrTypeName", () => {

    test("unexpected type name characters throw an error", () => {
        expect(() => parseClrTypeName("Sys?tem.String"))
            .toThrow()
    });

    test("fully qualified types have all attributes assigned", () => {
        expect(parseClrTypeName("Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null"))
            .toMatchObject({
                name: "Sitecore.Commerce.Plugin.Shops.Shop", 
                assembly: "Sitecore.Commerce.Plugin.Shops", 
                attributes: {
                    "Version": "2.0.0.0", 
                    "Culture": "neutral", 
                    "PublicKeyToken": "null"
                }, 
                genericTypes: []
            })
    });

    test("simple qualifed generic type arguments are parsed", () => {
        expect(parseClrTypeName("System.Collections.Generic.IDictionary`2[System.Int32, System.String]"))
            .toMatchObject({name: "System.Collections.Generic.IDictionary", assembly: "", attributes: {}, genericTypes: [
                { name: "System.Int32" },
                { name: "System.String" }
            ]})
    });

    test("fully qualifed generic type arguments are parsed", () => {
        expect(parseClrTypeName("System.Collections.Generic.IEnumerable`1[[Sitecore.Commerce.Plugin.Shops.Shop, Sitecore.Commerce.Plugin.Shops, Version=2.0.0.0, Culture=neutral, PublicKeyToken=null]]"))
            .toMatchObject({name: "System.Collections.Generic.IEnumerable", assembly: "", attributes: {}, genericTypes: [
                { name: "Sitecore.Commerce.Plugin.Shops.Shop", assembly: "Sitecore.Commerce.Plugin.Shops", attributes: { "Version": "2.0.0.0", "Culture": "neutral", "PublicKeyToken": "null" } }
            ]})
    });

    test("nested generic type arguments are parsed", () => {
        expect(parseClrTypeName("System.Collections.Generic.IEnumerable`1[[System.Tuple`2[System.String,[System.Int32]]]]"))
            .toMatchObject({name: "System.Collections.Generic.IEnumerable", assembly: "", attributes: {}, genericTypes: [
                { name: "System.Tuple", assembly: "", attributes: {}, genericTypes: [
                    { name: "System.String" },
                    { name: "System.Int32" }
                ]}
            ]})
    });

    test("simple type only assigned name", () => {
        expect(parseClrTypeName("System.String"))
            .toMatchObject({name: "System.String", assembly: "", attributes: {}, genericTypes: []})
    });

});
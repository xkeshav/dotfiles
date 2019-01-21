{
const groupData = [
    {
      "name": "test group",
      "description": "test group",
      "id": 1
    },
    {
      "name": "test group1",
      "description": "dsdsds",
      "id": 3
    },
    {
      "name": "Test123",
      "description": "Test12",
      "id": 5
    },
    {
      "name": "dffdfd",
      "description": "fdfd",
      "id": 8
    },
    {
      "name": "grp1",
      "description": "",
      "id": 10
    }
  ];

const userData = [
    {
      "privilegeduserid": 9,
      "applicationid": 188,
      "loginid": "ddffffff",
      "name": "test group1",
      "applicationusername": null,
      "emailaddress": null,
      "status": -1,
      "groups": [
        1,3
      ]
    },
    {
      "privilegeduserid": 11,
      "applicationid": 188,
      "loginid": "Test56",
      "name": "Test234",
      "applicationusername": null,
      "emailaddress": null,
      "status": -1,
      "groups": [
        5
      ]
    },
    {
      "privilegeduserid": 10,
      "applicationid": 188,
      "loginid": "test",
      "name": "test1234",
      "applicationusername": null,
      "emailaddress": null,
      "status": -1,
      "groups": [
        1
      ]
    },
    {
      "privilegeduserid": 12,
      "applicationid": 188,
      "loginid": "dd",
      "name": "Test888",
      "applicationusername": null,
      "emailaddress": null,
      "status": -1,
      "groups": [
        1
      ]
    },
    {
      "privilegeduserid": 13,
      "applicationid": 188,
      "loginid": "email",
      "name": "email_address",
      "applicationusername": null,
      "emailaddress": null,
      "status": -1,
      "groups": [
        1
      ]
    }
  ];

  const usersWithGroups = userData.reduce( (prev, curr) => {
    const {groups, ...current} = curr;
    current.groups = [];
    groups.map( gid => {
      const grp = groupData.find( gd => gid === gd.id);
      return current.groups.push(grp);
    });
    return prev.concat(current);
  }, []);

  console.log(usersWithGroups);
}
  
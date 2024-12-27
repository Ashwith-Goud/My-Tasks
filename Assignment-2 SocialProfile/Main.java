import java.util.Scanner;

class Main {
    public static void main(String[] args) {
        SocialPlatform platform = new SocialPlatform();
        Scanner s = new Scanner(System.in);
        int option;
        System.out.println("Welcome to the Social Platform");

        do {
            System.out.println(
                    "Choose an Option:\n1.Add User\n2.Get all the User\n3.Add Friend to User\n4.Add Follower to User\n5.Add HashTag\n6.View User's Friends\n7.View User's Followers\n8.View TrendingHashTags\n9.Get phone Number.\n10.Remove a Friend.\n11.Exit.");
            System.out.println("Enter your Option");
            option = s.nextInt();

            switch (option) {
                case 1:
                    System.out.println("Enter User Id :");
                    int userId = s.nextInt();
                    System.out.println("Enter User Name:");
                    String userName = s.next();
                    System.out.println("Enter Phone Number:");
                    int phone = s.nextInt();
                    platform.addUser(userId, userName, phone);
                    break;
                case 2:
                    platform.getAllusers();
                    break;

                case 3:
                    System.out.println("Enter user Id :");
                    userId = s.nextInt();
                    System.out.println("Enter Friend Name:");
                    s.nextLine();
                    String friendName = s.nextLine();
                    platform.addaFriend(userId, friendName);
                    break;

                case 4:
                    System.out.println("Enter user Id :");
                    userId = s.nextInt();
                    System.out.println("Enter follower name:");
                    s.nextLine();
                    String followerName = s.nextLine();
                    platform.addaFollower(userId, followerName);
                    System.out.println("Follower added successfully!");
                    break;

                case 5:
                    System.out.print("Enter Hashtag: ");
                    s.nextLine();
                    String hashtag = s.nextLine();
                    platform.addHashtag(hashtag);
                    System.out.println("Hashtag added successfully!");
                    break;

                case 6:
                    System.out.print("Enter User ID: ");
                    userId = s.nextInt();
                    System.out.println("Friends: " + platform.getuserProfile(userId).getFriends());
                    break;

                case 7:
                    System.out.print("Enter User ID: ");
                    userId = s.nextInt();
                    System.out.println("Followers: " + platform.getFollowers(userId));
                    break;

                case 8:
                    System.out.println("Trending Hashtags: " + platform.getTrendingHashtags());
                    break;

                case 9:
                    System.out.println("Enter User Id:");
                    userId = s.nextInt();
                    System.out.println("Phone Number :" + platform.getNumber(userId));
                    break;
                case 10:
                    System.out.println("Enter user Id:");
                    userId = s.nextInt();
                    System.out.println("Enter friend name you want to remove:");
                    s.nextLine();
                    friendName = s.nextLine();
                    platform.removeaFriend(userId, friendName);
                    System.out.println("Friend Removed.");
                    break;

                case 11:
                    System.out.println("Exiting the Application. Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");

            }
        } while (option != 11);
        s.close();
    }
}

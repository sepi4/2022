public class Program
{
  public static void Main(string[] args)
  {

    Console.WriteLine("Hello, World!");
  }

  public static int Sum2(int a, int b)
  {
    return a + b;
  }

  public static string[] ReadInput(string path)
  {
    var input = File.ReadAllText(path);
    return input.Split("\n");
  }
}